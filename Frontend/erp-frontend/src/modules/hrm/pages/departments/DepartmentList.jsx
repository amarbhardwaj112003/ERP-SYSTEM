import { useEffect, useState } from "react";
import HRM from "../../../../services/hrmApi";
import { Link } from "react-router-dom";

export default function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const res = await HRM.getDepartments(); // <-- FIXED HERE
      setDepartments(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete department?")) return;
    try {
      await HRM.deleteDepartment(id);
      load();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Departments</h1>
        <Link to="/hr/departments/add" className="bg-blue-600 text-white px-4 py-2 rounded">
          + Add
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-2">No departments</td>
              </tr>
            ) : (
              departments.map((d) => (
                <tr key={d.id}>
                  <td className="p-2 border">{d.id}</td>
                  <td className="p-2 border">{d.name}</td>
                  <td className="p-2 border">
                    <Link to={`/hr/departments/add?id=${d.id}`} className="mr-2 text-blue-600">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(d.id)} className="text-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
