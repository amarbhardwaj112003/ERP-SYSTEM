import { useEffect, useState } from "react";
import HRM from "../../../../services/hrmApi";
import { useNavigate } from "react-router-dom";

export default function MarkAttendance() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await HRM.getEmployees();
      setEmployees(res.data);
    } catch (err) {
      console.error("Error loading employees", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedEmployee) {
      alert("Please select an employee");
      return;
    }

    try {
      await HRM.markAttendance({
        employee: selectedEmployee,
        check_in: new Date().toLocaleTimeString("en-GB"), // 24-hour format
      });

      alert("Attendance marked successfully!");
      navigate("/hrm/attendance");
    } catch (err) {
      console.error("Error marking attendance", err);
      alert("Attendance for today already exists or error occurred");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Mark Attendance</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Employee Dropdown */}
        <div>
          <label className="block mb-1 font-semibold">Select Employee:</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">-- Choose Employee --</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.user.first_name} {emp.user.last_name} ({emp.employee_id})
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Mark Attendance
        </button>
      </form>
    </div>
  );
}
