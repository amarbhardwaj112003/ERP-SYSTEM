import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FinanceAPI from "../../../../services/financeApi";

export default function AccountList() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const res = await FinanceAPI.getAccounts();
      setAccounts(res.data);
    } catch (err) {
      console.error("Error fetching accounts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this account?")) return;

    try {
      await FinanceAPI.deleteAccount(id);
      setAccounts(accounts.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete account");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Accounts</h2>
        <Link
          to="/finance/accounts/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Account
        </Link>
      </div>

      {loading ? (
        <div className="p-6 text-center text-gray-500">Loading...</div>
      ) : accounts.length === 0 ? (
        <div className="p-6 text-center text-gray-600">No accounts found.</div>
      ) : (
        <table className="w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Balance</th>
              <th className="p-3 border">Currency</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((acc) => (
              <tr key={acc.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{acc.name}</td>
                <td className="p-3">₹{acc.balance}</td>
                <td className="p-3">{acc.currency}</td>
                <td className="p-3">
                  <Link
                    to={`/finance/accounts/edit/${acc.id}`}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(acc.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
