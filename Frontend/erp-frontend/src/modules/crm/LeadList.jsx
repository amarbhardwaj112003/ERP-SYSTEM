import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { crmApi } from "../../../../services/crmApi";

export default function LeadList() {
  const [leads, setLeads] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      const res = await crmApi.getLeads();
      setLeads(res.data);
      setFiltered(res.data);
    } catch (error) {
      console.error("Failed to load leads", error);
    }
  };

  // Apply search + status filter
  useEffect(() => {
    let data = leads;

    if (search.trim() !== "") {
      data = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== "all") {
      data = data.filter((item) => item.status === status);
    }

    setFiltered(data);
  }, [search, status, leads]);

  const statusBadge = (st) => {
    const colors = {
      new: "bg-blue-100 text-blue-600",
      qualified: "bg-yellow-100 text-yellow-700",
      converted: "bg-green-100 text-green-700",
      closed: "bg-gray-300 text-gray-600",
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm ${colors[st]}`}>
        {st.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-semibold">Leads</h1>

        <button
          onClick={() => navigate("/crm/leads/add")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          + Add Lead
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-5">

        <input
          type="text"
          placeholder="Search Lead..."
          className="p-2 border rounded w-60"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-2 border rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="qualified">Qualified</option>
          <option value="converted">Converted</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Source</th>
              <th className="p-3 text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No leads found.
                </td>
              </tr>
            ) : (
              filtered.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/crm/leads/${lead.id}`)}
                >
                  <td className="p-3">{lead.name}</td>
                  <td className="p-3">{lead.email}</td>
                  <td className="p-3">{lead.source}</td>
                  <td className="p-3 text-center">{statusBadge(lead.status)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
