import { useState } from "react";
import { crmApi } from "../../../../services/crmApi";
import { useNavigate } from "react-router-dom";

export default function AddCustomer() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await crmApi.createCustomer(form);
      navigate("/crm/customers"); // redirect
    } catch (err) {
      setError("Failed to add customer. Check inputs or server.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Add New Customer</h1>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Name */}
        <div>
          <label className="font-medium">Customer Name</label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Email */}
        <div>
          <label className="font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Company */}
        <div>
          <label className="font-medium">Company</label>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="font-medium">Address</label>
          <textarea
            name="address"
            rows="3"
            value={form.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          ></textarea>
        </div>

        {/* Button */}
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Add Customer"}
          </button>
        </div>
      </form>
    </div>
  );
}
