import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HRM from "../../../../services/hrmApi";

export default function AddEmployee() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const editId = params.get("id");

  const [form, setForm] = useState({
    name: "",
    email: "",
    user_id: "", // Manually filled user ID
    employee_id: "",
    designation: "",
    joining_date: "",
    contact: "",
    address: "",
    salary: "",
    department_id: "",
  });

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load departments from API
  useEffect(() => {
    (async () => {
      try {
        const res = await HRM.listDepartments();
        setDepartments(res.data);
      } catch (err) {
        console.error("Department load failed:", err);
        setDepartments([
          { id: 1, name: "Software Development" },
          { id: 2, name: "HR" },
          { id: 3, name: "Finance" },
        ]); // Fallback
      }
    })();
  }, []);

  // Load employee if editing
  useEffect(() => {
    if (editId) {
      (async () => {
        try {
          const res = await HRM.getEmployee(editId);
          setForm({
            name: res.data.name || "",
            email: res.data.email || "",
            user_id: res.data.user?.id || "",
            employee_id: res.data.employee_id || "",
            designation: res.data.designation || "",
            joining_date: res.data.joining_date || "",
            contact: res.data.contact || "",
            address: res.data.address || "",
            salary: res.data.salary || "",
            department_id: res.data.department_id || "",
          });
        } catch (err) {
          console.error(err);
          setError("Failed to fetch employee data.");
        }
      })();
    }
  }, [editId]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.user_id) {
      setError("User ID is required.");
      return;
    }

    try {
      setLoading(true);

      if (editId) await HRM.updateEmployee(editId, form);
      else await HRM.createEmployee(form);

      navigate("/hr/employees");
    } catch (err) {
      console.error(err);

      if (err.response?.data) {
        const messages = Object.entries(err.response.data)
          .map(([key, val]) => `${key}: ${val.join(", ")}`)
          .join("\n");
        setError(messages);
      } else {
        setError("Network error or server not responding.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {editId ? "Edit Employee" : "Add Employee"}
      </h1>

      {error && (
        <div className="mb-4 p-2 bg-red-200 text-red-800 rounded whitespace-pre-wrap">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">

        <label>User ID</label>
        <input
          name="user_id"
          type="number"
          value={form.user_id}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <label>Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <label>Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <label>Employee ID</label>
        <input
          name="employee_id"
          value={form.employee_id}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <label>Designation</label>
        <input
          name="designation"
          value={form.designation}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <label>Joining Date</label>
        <input
          name="joining_date"
          type="date"
          value={form.joining_date}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <label>Contact</label>
        <input
          name="contact"
          value={form.contact}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <label>Address</label>
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <label>Salary</label>
        <input
          name="salary"
          type="number"
          value={form.salary}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <label>Department</label>
        <select
          name="department_id"
          value={form.department_id}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
