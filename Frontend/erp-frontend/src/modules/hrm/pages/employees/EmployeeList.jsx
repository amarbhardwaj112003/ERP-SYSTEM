import { useEffect, useState } from "react";
import HRM from "../../../../services/hrmApi";
import { Link } from "react-router-dom";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const res = await HRM.getEmployees();
      setEmployees(res.data);
    } catch (e) {
      console.error(e);
      setError("Failed to load employees.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete employee?")) return;
    try {
      await HRM.deleteEmployee(id);
      loadEmployees();
    } catch (e) {
      console.error(e);
      setError("Failed to delete employee.");
    }
  };

  const getFullName = (user) => {
    if (!user) return "N/A";
    const fullName = `${user.first_name || ""} ${user.last_name || ""}`.trim();
    return fullName || user.username || "N/A";
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Employees</h1>
        <Link to="/hr/employees/add" className="bg-blue-600 text-white px-4 py-2 rounded">
          + Add
        </Link>
      </div>

      {error && <div className="mb-4 p-2 bg-red-200 text-red-800 rounded">{error}</div>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Department</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-2 text-center">No employees</td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp.id}>
                  <td className="p-2 border">{emp.id}</td>
                  <td className="p-2 border">{getFullName(emp.user)}</td>
                  <td className="p-2 border">{emp.user?.email || "N/A"}</td>
                  <td className="p-2 border">{emp.department || "N/A"}</td>
                  <td className="p-2 border">
                    <Link to={`/hr/employees/add?id=${emp.id}`} className="mr-2 text-blue-600">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(emp.id)} className="text-red-600">
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
