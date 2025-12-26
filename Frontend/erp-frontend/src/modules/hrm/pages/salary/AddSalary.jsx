import { useState, useEffect } from "react";
import HRM from "../../../../services/hrmApi";

export default function AddSalary() {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState("");
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await HRM.getEmployees();
      setEmployees(res.data);
    } catch (err) {
      console.error("Error loading employees:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employee || !amount || !month || !year) {
      alert("Please fill all fields");
      return;
    }

    try {
      await HRM.createSalary({ employee: Number(employee), amount, month, year });
      alert("Salary added successfully!");
      setEmployee(""); setAmount(""); setMonth(""); setYear("");
    } catch (err) {
      console.error("Error adding salary:", err);
      alert("Failed to add salary");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Add Salary</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded">
        <div className="mb-3">
          <label className="block font-medium mb-1">Employee</label>
          <select
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="">-- Select Employee --</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="block font-medium mb-1">Amount</label>
          <input
            type="number"
            className="border p-2 w-full"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="block font-medium mb-1">Month</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder="e.g., January"
          />
        </div>

        <div className="mb-3">
          <label className="block font-medium mb-1">Year</label>
          <input
            type="number"
            className="border p-2 w-full"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="e.g., 2025"
          />
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Salary
        </button>
      </form>
    </div>
  );
}
