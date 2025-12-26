import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HRM from "../../../../services/hrmApi";

export default function AttendanceList() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      const res = await HRM.getAttendance();
      setAttendance(res.data);
    } catch (err) {
      console.error("Error loading attendance", err);
    }
  };

  // Calculate status
  const getStatus = (record) => {
    if (record.check_in && !record.check_out) return "Present (Not Checked Out)";
    if (record.check_in && record.check_out) return "Present";
    return "Absent";
  };

  return (
    <div className="p-4">
      {/* Header + Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Attendance Records</h2>

        {/* FINAL FIX HERE → relative path "mark" */}
        <Link
          to="mark"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Mark Attendance
        </Link>
      </div>

      {/* Attendance Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Employee</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Check-In</th>
            <th className="p-2 border">Check-Out</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>

        <tbody>
          {attendance.map((item) => (
            <tr key={item.id}>
              <td className="p-2 border">{item.employee_name}</td>
              <td className="p-2 border">{item.date}</td>
              <td className="p-2 border">{item.check_in || "--"}</td>
              <td className="p-2 border">{item.check_out || "--"}</td>
              <td className="p-2 border">{getStatus(item)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
