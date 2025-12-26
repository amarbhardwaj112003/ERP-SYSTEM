import { useEffect, useState } from "react";
import FinanceAPI from "../../services/financeApi";
import Modal from "react-modal";
import { motion } from "framer-motion";
import {
  CurrencyRupeeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  PencilIcon,
  TrashIcon,
  PlusCircleIcon
} from "@heroicons/react/24/outline";

Modal.setAppElement("#root");

export default function FinanceDashboard() {
  // Stats
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [formData, setFormData] = useState({});
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [accRes, txRes, invRes, auditRes] = await Promise.all([
        FinanceAPI.getAccounts(),
        FinanceAPI.getTransactions(),
        FinanceAPI.getInvoices(),
        FinanceAPI.getAuditLogs()
      ]);
      setAccounts(accRes.data);
      setTransactions(txRes.data);
      setInvoices(invRes.data);
      setAuditLogs(auditRes.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch data");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setFormData(item || {});
    setEditId(item?.id || null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };

      // Account
      if (modalType === "account") {
        payload.balance = payload.balance ? parseFloat(payload.balance) : 0;
        payload.currency = payload.currency || "INR";
        if (!payload.name) throw new Error("Account name is required");

        if (editId) {
          const res = await FinanceAPI.updateAccount(editId, payload);
          setAccounts(prev => prev.map(a => a.id === editId ? res.data : a));
        } else {
          const res = await FinanceAPI.createAccount(payload);
          setAccounts(prev => [res.data, ...prev]);
        }
      }

      // Transaction
      if (modalType === "transaction") {
        payload.amount = parseFloat(payload.amount);
        payload.transaction_type = payload.transaction_type || "income";
        if (!payload.source_module || !payload.date || !payload.description)
          throw new Error("Fill all transaction fields");

        if (editId) {
          const res = await FinanceAPI.updateTransaction(editId, payload);
          setTransactions(prev => prev.map(t => t.id === editId ? res.data : t));
        } else {
          const res = await FinanceAPI.createTransaction(payload);
          setTransactions(prev => [res.data, ...prev]);
        }

        // Update account balance
        if (payload.account) {
          const idx = accounts.findIndex(a => a.id === payload.account);
          if (idx >= 0) {
            const updated = [...accounts];
            updated[idx].balance += payload.transaction_type === "income" ? payload.amount : -payload.amount;
            setAccounts(updated);
          }
        }
      }

      // Invoice
      
      if (modalType === "invoice") {
        payload.amount = parseFloat(payload.amount);
        payload.tax_percent = payload.tax_percent
          ? parseFloat(payload.tax_percent)
          : 18;

        // ✅ FINAL DATE FIX
        if (payload.due_date?.includes("T")) {
          payload.due_date = payload.due_date.split("T")[0];
        }

        if (!payload.issued_to || !payload.issued_by || !payload.due_date)
          throw new Error("Fill all invoice fields");

        if (editId) {
          const res = await FinanceAPI.updateInvoice(editId, payload);
          setInvoices(prev => prev.map(i => i.id === editId ? res.data : i));
        } else {
          const res = await FinanceAPI.createInvoice(payload);
          setInvoices(prev => [res.data, ...prev]);
        }
      }

      setModalOpen(false);
      setFormData({});
      setEditId(null);

    } catch (err) {
      console.error(err.response?.data || err.message || err);
      alert("Error saving data. Check console.");
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      if (type === "account") await FinanceAPI.deleteAccount(id);
      if (type === "transaction") await FinanceAPI.deleteTransaction(id);
      if (type === "invoice") await FinanceAPI.deleteInvoice(id);

      if (type === "account") setAccounts(prev => prev.filter(a => a.id !== id));
      if (type === "transaction") setTransactions(prev => prev.filter(t => t.id !== id));
      if (type === "invoice") setInvoices(prev => prev.filter(i => i.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  const downloadInvoice = (invoice) => {
    const content = `
Invoice #${invoice.id}
Issued To: ${invoice.issued_to}
Issued By: ${invoice.issued_by}
Amount: ₹${invoice.amount}
Tax (${invoice.tax_percent}%): ₹${((invoice.tax_percent/100)*invoice.amount).toFixed(2)}
Total: ₹${(invoice.amount + (invoice.tax_percent/100)*invoice.amount).toFixed(2)}
Status: ${invoice.status}
Issued Date: ${invoice.issued_date}
Due Date: ${invoice.due_date}
`;
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Invoice_${invoice.id}.txt`;
    link.click();
  };

  const cardAnim = { hidden: { opacity:0, y:20 }, show: { opacity:1, y:0 } };

  return (
    <div className="p-6 space-y-8">
      <motion.h1 initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} className="text-4xl font-bold text-gray-800">
        Finance Dashboard
      </motion.h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Accounts" count={accounts.length} icon={<CurrencyRupeeIcon className="h-10 w-10 text-white opacity-70"/>} delay={0.1} from="blue" />
        <StatCard title="Transactions" count={transactions.length} icon={<ArrowUpIcon className="h-10 w-10 text-white opacity-70"/>} delay={0.2} from="green" />
        <StatCard title="Invoices" count={invoices.length} icon={<DocumentTextIcon className="h-10 w-10 text-white opacity-70"/>} delay={0.3} from="purple" />
        <StatCard title="Audit Logs" count={auditLogs.length} icon={<ClipboardDocumentCheckIcon className="h-10 w-10 text-white opacity-70"/>} delay={0.4} from="gray" />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mt-4">
        <ActionButton text="Add Account" color="blue" onClick={()=>openModal("account")} />
        <ActionButton text="Add Transaction" color="green" onClick={()=>openModal("transaction")} />
        <ActionButton text="Add Invoice" color="purple" onClick={()=>openModal("invoice")} />
      </div>

      {/* Tables */}
      <TableSection title="Accounts" data={accounts} type="account" onEdit={openModal} onDelete={handleDelete} />
      <TableSection title="Transactions" data={transactions} type="transaction" onEdit={openModal} onDelete={handleDelete} />
      <TableSection title="Invoices" data={invoices} type="invoice" onEdit={openModal} onDelete={handleDelete} onDownload={downloadInvoice} />
      <TableSection title="Audit Logs" data={auditLogs} type="audit" />

      {/* Modal */}
      <FinanceModal
        isOpen={modalOpen} onRequestClose={()=>setModalOpen(false)}
        type={modalType} formData={formData} setFormData={setFormData}
        handleChange={handleChange} handleSubmit={handleSubmit}
      />
    </div>
  );
}

/* ----------------- Components ----------------- */
function StatCard({title,count,icon,delay,from}) {
  const gradient = `from-${from}-600 to-${from}-800`;
  return (
    <motion.div variants={{hidden:{opacity:0,y:20}, show:{opacity:1,y:0}}} initial="hidden" animate="show" transition={{delay}} className={`p-6 bg-gradient-to-br ${gradient} text-white rounded-2xl shadow-xl hover:scale-105 transform transition flex items-center justify-between`}>
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-3xl font-bold mt-1">{count}</p>
      </div>
      {icon}
    </motion.div>
  );
}

function ActionButton({text,color,onClick}) {
  const bg = `bg-${color}-600`;
  const hover = `hover:bg-${color}-700`;
  return (
    <button className={`flex items-center gap-2 px-4 py-2 text-white rounded ${bg} ${hover} transition`} onClick={onClick}>
      <PlusCircleIcon className="h-5 w-5"/> {text}
    </button>
  );
}

function TableSection({ title, data, type, onEdit, onDelete, onDownload }) {
  return (
    <div className="overflow-x-auto mb-6">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            {data.length>0 && Object.keys(data[0]).map(key => (
              <th key={key} className="px-4 py-2 text-left">{key.replace("_"," ").toUpperCase()}</th>
            ))}
            {(type!=="audit") && <th className="px-4 py-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <motion.tr key={item.id} initial={{opacity:0}} animate={{opacity:1}} className="border-b hover:bg-gray-50 transition">
              {Object.keys(item).map(key => <td key={key} className="px-4 py-2">{item[key]}</td>)}
              {(type!=="audit") && (
                <td className="px-4 py-2 flex gap-2">
                  <button className="flex items-center gap-1 px-2 py-1 bg-yellow-500 text-white rounded" onClick={()=>onEdit(type,item)}><PencilIcon className="h-4 w-4"/>Edit</button>
                  <button className="flex items-center gap-1 px-2 py-1 bg-red-600 text-white rounded" onClick={()=>onDelete(type,item.id)}><TrashIcon className="h-4 w-4"/>Delete</button>
                  {type==="invoice" && <button className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded" onClick={()=>onDownload(item)}><DocumentTextIcon className="h-4 w-4"/>Download</button>}
                </td>
              )}
            </motion.tr>
          ))}
        </tbody>
      </table>
      {data.length===0 && <p className="text-gray-500 mt-2">No records found.</p>}
    </div>
  );
}

function FinanceModal({ isOpen, onRequestClose, type, formData, setFormData, handleChange, handleSubmit }) {
  return (
    <Modal
      isOpen={isOpen} onRequestClose={onRequestClose}
      className="bg-white p-6 rounded-lg shadow max-w-md mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center"
    >
      <h2 className="text-xl font-bold mb-4">{formData.id ? "Edit" : "Add"} {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {type==="account" && <>
          <input type="text" name="name" placeholder="Account Name" value={formData.name||""} onChange={handleChange} required className="w-full px-3 py-2 border rounded"/>
          <input type="number" name="balance" placeholder="Balance" value={formData.balance||""} onChange={handleChange} className="w-full px-3 py-2 border rounded"/>
          <input type="text" name="currency" placeholder="Currency" value={formData.currency||"INR"} onChange={handleChange} className="w-full px-3 py-2 border rounded"/>
        </>}
        {type==="transaction" && <>
          <input type="text" name="source_module" placeholder="Source Module" value={formData.source_module||""} onChange={handleChange} required className="w-full px-3 py-2 border rounded"/>
          <select name="transaction_type" value={formData.transaction_type||"income"} onChange={handleChange} className="w-full px-3 py-2 border rounded">
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <input type="number" name="amount" placeholder="Amount" value={formData.amount||""} onChange={handleChange} required className="w-full px-3 py-2 border rounded"/>
          <input type="date" name="date" value={formData.date||""} onChange={handleChange} required className="w-full px-3 py-2 border rounded"/>
          <textarea name="description" placeholder="Description" value={formData.description||""} onChange={handleChange} required className="w-full px-3 py-2 border rounded"/>
        </>}
        {type==="invoice" && <>
          <input type="text" name="issued_to" placeholder="Issued To" value={formData.issued_to||""} onChange={handleChange} required className="w-full px-3 py-2 border rounded"/>
          <input type="text" name="issued_by" placeholder="Issued By" value={formData.issued_by||""} onChange={handleChange} required className="w-full px-3 py-2 border rounded"/>
          <input type="number" name="amount" placeholder="Amount" value={formData.amount||""} onChange={handleChange} required className="w-full px-3 py-2 border rounded"/>
          <input type="number" name="tax_percent" placeholder="Tax %" value={formData.tax_percent||18} onChange={handleChange} className="w-full px-3 py-2 border rounded"/>
          <input type="date" name="due_date" value={formData.due_date||""} onChange={handleChange} required className="w-full px-3 py-2 border rounded"/>
          <select name="status" value={formData.status||"pending"} onChange={handleChange} className="w-full px-3 py-2 border rounded">
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
        </>}
        <div className="flex justify-end gap-2 mt-3">
          <button type="button" onClick={onRequestClose} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </form>
    </Modal>
  );
}
