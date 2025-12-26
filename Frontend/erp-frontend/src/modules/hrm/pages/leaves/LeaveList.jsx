import { useEffect, useState } from "react";
import HRM from "../../../../services/hrmApi";

export default function LeaveList(){
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try { setLoading(true); const res = await HRM.listLeaves(); setLeaves(res.data); }
    catch(e){ console.error(e); } finally { setLoading(false); }
  };

  useEffect(()=>{ load(); }, []);

  const setStatus = async (id, status) => {
    try {
      await HRM.updateLeave(id, { status });
      load();
    } catch (e) { console.error(e); }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Leave Requests</h1>
      {loading ? <p>Loading...</p> : (
        <table className="w-full border">
          <thead><tr><th className="p-2 border">ID</th><th className="p-2 border">Employee</th><th className="p-2 border">From</th><th className="p-2 border">To</th><th className="p-2 border">Status</th><th className="p-2 border">Actions</th></tr></thead>
          <tbody>
            {leaves.length === 0 ? <tr><td colSpan="6" className="p-2">No leaves</td></tr> :
              leaves.map(l => (
                <tr key={l.id}>
                  <td className="p-2 border">{l.id}</td>
                  <td className="p-2 border">{l.employee_name || l.employee}</td>
                  <td className="p-2 border">{l.start_date}</td>
                  <td className="p-2 border">{l.end_date}</td>
                  <td className="p-2 border">{l.status}</td>
                  <td className="p-2 border">
                    <button className="mr-2 text-green-600" onClick={()=>setStatus(l.id, "approved")}>Approve</button>
                    <button className="text-red-600" onClick={()=>setStatus(l.id, "rejected")}>Reject</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      )}
    </div>
  );
}
