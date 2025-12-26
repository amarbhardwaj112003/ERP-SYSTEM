// src/modules/inventory/InventoryDashboard.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingBagIcon, CubeIcon, ClipboardDocumentCheckIcon, UserGroupIcon 
} from "@heroicons/react/24/outline";
import { PlusCircleIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import CountUp from "react-countup";
import Modal from "../../components/Modal";
import inventoryApi from "../../services/inventoryApi";

const InventoryDashboard = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [rawMaterials, setRawMaterials] = useState([]);
  const [finishedProducts, setFinishedProducts] = useState([]);
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalType, setModalType] = useState("");
  const [modalData, setModalData] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [supRes, rmRes, fpRes, auditRes] = await Promise.all([
        inventoryApi.getSuppliers(),
        inventoryApi.getRawMaterials(),
        inventoryApi.getFinishedProducts(),
        inventoryApi.getAudits(),
      ]);
      setSuppliers(supRes.data);
      setRawMaterials(rmRes.data);
      setFinishedProducts(fpRes.data);
      setAudits(auditRes.data);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const openModal = (type, data = null) => { setModalType(type); setModalData(data); };
  const closeModal = () => { setModalType(""); setModalData(null); };

  const handleDelete = async (type, id) => {
    if (!window.confirm("Are you sure?")) return;
    try { await inventoryApi.deleteItem(type, id); fetchData(); } 
    catch (err) { console.error(err); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    if (modalType === "raw-material" || modalType === "finished-product") data.quantity = parseInt(data.quantity);

    try {
      if (modalData?.id) await inventoryApi.updateItem(modalType, modalData.id, data);
      else await inventoryApi.createItem(modalType, data);
      closeModal();
      fetchData();
    } catch (err) { console.error(err); }
  };

  if (loading) return <div className="text-center text-gray-500 mt-10">Loading...</div>;

  const stats = [
    { title: "Raw Materials", value: rawMaterials.length, icon: <CubeIcon className="h-10 w-10" />, gradient: "from-indigo-500 to-indigo-700", iconColor: "text-white" },
    { title: "Finished Products", value: finishedProducts.length, icon: <ShoppingBagIcon className="h-10 w-10" />, gradient: "from-green-500 to-green-700", iconColor: "text-white" },
    { title: "Suppliers", value: suppliers.length, icon: <UserGroupIcon className="h-10 w-10" />, gradient: "from-yellow-500 to-yellow-700", iconColor: "text-white" },
    { title: "Audit Logs", value: audits.length, icon: <ClipboardDocumentCheckIcon className="h-10 w-10" />, gradient: "from-purple-500 to-purple-700", iconColor: "text-white" },
  ];

  return (
    <div className="p-6 space-y-10 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-extrabold text-gray-900 tracking-wide drop-shadow-sm">
        Inventory Dashboard
      </motion.h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: idx * 0.1 }}
            className={`p-6 rounded-2xl shadow-lg text-white bg-gradient-to-br ${stat.gradient} hover:shadow-2xl hover:scale-[1.03] transform transition-all relative overflow-hidden`}
          >
            <div className={`absolute -right-6 -top-6 opacity-20 scale-150 ${stat.iconColor}`}>{stat.icon}</div>
            <h2 className="text-xl font-semibold relative z-10">{stat.title}</h2>
            <p className="text-4xl font-bold mt-2 relative z-10"><CountUp end={stat.value} duration={1.5} separator="," /></p>
          </motion.div>
        ))}
      </div>

      {/* Add Buttons */}
      <div className="flex gap-2 mb-4">
        <button onClick={() => openModal("raw-material")} className="px-4 py-2 flex items-center gap-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
          <PlusCircleIcon className="h-5 w-5"/> Add Raw Material
        </button>
        <button onClick={() => openModal("finished-product")} className="px-4 py-2 flex items-center gap-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
          <PlusCircleIcon className="h-5 w-5"/> Add Finished Product
        </button>
      </div>

      {/* Modal */}
      <Modal isOpen={!!modalType} title={modalData ? `Edit ${modalType.replace("-", " ")}` : `Add ${modalType.replace("-", " ")}`} onClose={closeModal}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {modalType === "raw-material" && <>
            <InputField name="name" placeholder="Name" defaultValue={modalData?.name} icon={<CubeIcon className="h-5 w-5"/>}/>
            <InputField name="quantity" type="number" placeholder="Quantity" defaultValue={modalData?.quantity || 0} icon={<ClipboardDocumentCheckIcon className="h-5 w-5"/>}/>
            <InputField name="unit" placeholder="Unit" defaultValue={modalData?.unit} icon={<CubeIcon className="h-5 w-5"/>}/>
            <select name="supplier" defaultValue={modalData?.supplier || ""} required className="border px-2 py-1 rounded">
              <option value="">Select Supplier</option>
              {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <InputField name="purchase_date" type="date" defaultValue={modalData?.purchase_date} icon={<ClipboardDocumentCheckIcon className="h-5 w-5"/>}/>
          </>}
          {modalType === "finished-product" && <>
            <InputField name="name" placeholder="Name" defaultValue={modalData?.name} icon={<ShoppingBagIcon className="h-5 w-5"/>}/>
            <InputField name="sku" placeholder="SKU" defaultValue={modalData?.sku} icon={<ClipboardDocumentCheckIcon className="h-5 w-5"/>}/>
            <InputField name="category" placeholder="Category" defaultValue={modalData?.category} icon={<CubeIcon className="h-5 w-5"/>}/>
            <InputField name="quantity" type="number" placeholder="Quantity" defaultValue={modalData?.quantity || 0} icon={<ClipboardDocumentCheckIcon className="h-5 w-5"/>}/>
          </>}
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">{modalData ? "Update" : "Add"}</button>
        </form>
      </Modal>

      {/* Tables */}
      <Table title="Raw Materials" data={rawMaterials} type="raw-material" handleDelete={handleDelete} modalHandler={openModal} columns={["name","quantity","unit","supplier_name","purchase_date"]} lowStockCheck/>
      <Table title="Finished Products" data={finishedProducts} type="finished-product" handleDelete={handleDelete} modalHandler={openModal} columns={["name","sku","category","quantity"]}/>
      <Table title="Audit Logs" data={audits} columns={["product_name","quantity","action","performed_by","timestamp"]} isAudit />
    </div>
  );
};

// Input Field with icon
const InputField = ({ icon, ...props }) => (
  <div className="flex items-center border px-2 py-1 rounded gap-2">
    {icon}
    <input {...props} className="flex-1 outline-none" />
  </div>
);

// Reusable table component
const Table = ({ title, data, type, handleDelete, modalHandler, columns, lowStockCheck, isAudit }) => (
  <div>
    <h2 className="text-xl font-bold mb-2">{title}</h2>
    <table className="min-w-full bg-white shadow rounded-lg overflow-hidden mb-6">
      <thead className="bg-gray-200">
        <tr>
          {columns.map(col => <th key={col} className="px-4 py-2 capitalize">{col.replace("_"," ")}</th>)}
          {!isAudit && <th className="px-4 py-2">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.id} className="border-b hover:bg-gray-50 transition">
            {columns.map(col => (
              <td key={col} className="px-4 py-2">
                {lowStockCheck && col === "quantity" ? (
                  row.quantity < row.reorder_level ? <span className="text-red-600 font-bold">{row.quantity}</span> : row.quantity
                ) : row[col]}
              </td>
            ))}
            {!isAudit && (
              <td className="px-4 py-2 flex gap-2">
                <button onClick={() => modalHandler(type, row)} className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition flex items-center gap-1"><PencilIcon className="h-4 w-4"/> Edit</button>
                <button onClick={() => handleDelete(type, row.id)} className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition flex items-center gap-1"><TrashIcon className="h-4 w-4"/> Delete</button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default InventoryDashboard;
