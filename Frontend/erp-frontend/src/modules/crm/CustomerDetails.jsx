import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { crmApi } from "../../../../services/crmApi";

export default function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch customer data
  const fetchCustomer = async () => {
    try {
      const res = await crmApi.getCustomer(id);
      setCustomer(res.data);
      setForm(res.data);
    } catch (err) {
      console.error("Error loading customer", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await crmApi.updateCustomer(id, form);
      setEditMode(false);
      fetchCustomer();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure? This cannot be undone.")) return;

    try {
      await crmApi.deleteCustomer(id);
      navigate("/crm/customers");
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  if (loading) return <p className="p-5">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          Customer Details
        </h1>

        {/* Actions */}
        <div className="flex gap-3">
          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Edit
            </button>
          )}

          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Detail or Edit Form */}
      {!editMode ? (
        <div className="bg-white shadow rounded-xl p-6">
          <p><strong>Name:</strong> {customer.name}</p>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Phone:</strong> {customer.phone}</p>
          <p><strong>Company:</strong> {customer.company}</p>
          <p><strong>Address:</strong> {customer.address}</p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

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

          <div className="md:col-span-2 flex justify-end gap-3">
            <button
              onClick={() => setEditMode(false)}
              className="px-4 py-2 bg-gray-300 text-black rounded-lg"
            >
              Cancel
            </button>

            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
