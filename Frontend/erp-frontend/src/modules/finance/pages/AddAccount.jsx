import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FinanceAPI from "../../../../services/financeApi";

export default function AddAccount() {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState("INR");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) loadAccount();
  }, [id]);

  const loadAccount = async () => {
    try {
      const res = await FinanceAPI.getAccount(id);
      setName(res.data.name);
      setBalance(res.data.balance);
      setCurrency(res.data.currency);
    } catch (err) {
      console.error("Error loading account:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, balance, currency };

    try {
      if (id) await FinanceAPI.updateAccount(id, data);
      else await FinanceAPI.createAccount(data);
      navigate("/finance/accounts");
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save account");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{id ? "Edit Account" : "Add Account"}</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded">
        <div className="mb-3">
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="block font-medium mb-1">Balance</label>
          <input
            type="number"
            className="border p-2 w-full"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="block font-medium mb-1">Currency</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            required
          />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {id ? "Update Account" : "Add Account"}
        </button>
      </form>
    </div>
  );
}
