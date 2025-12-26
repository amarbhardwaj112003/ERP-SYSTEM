import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { crmApi } from "../../../../services/crmApi";

export default function LeadDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState(null);
  const [form, setForm] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadLead = async () => {
    try {
      const res = await crmApi.getLead(id);
      setLead(res.data);
      setForm(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch lead", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLead();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await crmApi.updateLead(id, form);
      setEditMode(false);
      loadLead();
    } catch (error) {
      console.error("Failed to update lead", error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;

    try {
      await crmApi.deleteLead(id);
      navigate("/crm/leads");
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  if (!lead) return <p className="p-6 text-red-500">Lead not found</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Lead Details</h1>

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

      {/* View Mode */}
      {!editMode ? (
        <div className="bg-white p-6 rounded-xl shadow space-y-3">
          <p><strong>Name:</strong> {lead.name}</p>
          <p><strong>Email:</strong> {lead.email}</p>
          <p><strong>Mobile:</strong> {lead.mobile}</p>
          <p><strong>Source:</strong> {lead.source}</p>
          <p>
            <strong>Status:</strong>
            <span className="px-3 py-1 ml-2 bg-gray-200 rounded-full text-sm">
              {lead.status.toUpperCase()}
            </span>
          </p>
          <p><strong>Notes:</strong> {lead.notes || "No notes added"}</p>
        </div>
      ) : (
        // Edit Mode Form
        <div className="bg-white p-6 rounded-xl shadow grid grid-cols-1 md:grid-cols-2 gap-4">

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
            <label className="font-medium">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="font-medium">Source</label>
            <input
              type="text"
              name="source"
              value={form.source}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-medium">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="new">New</option>
              <option value="qualified">Qualified</option>
              <option value="converted">Converted</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="font-medium">Notes</label>
            <textarea
              name="notes"
              rows="3"
              value={form.notes}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            ></textarea>
          </div>

          <div className="md:col-span-2 flex justify-end gap-3">
            <button
              onClick={() => setEditMode(false)}
              className="px-4 py-2 bg-gray-400 rounded-lg"
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
