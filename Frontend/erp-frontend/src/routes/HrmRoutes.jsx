import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";

import HrmDashboard from "../modules/hrm/pages/HrmDashboard";

// Departments
import DepartmentList from "../modules/hrm/pages/departments/DepartmentList";
import AddDepartment from "../modules/hrm/pages/departments/AddDepartment";

// Employees
import EmployeeList from "../modules/hrm/pages/employees/EmployeeList";
import AddEmployee from "../modules/hrm/pages/employees/AddEmployee";

// Attendance
import AttendanceList from "../modules/hrm/pages/attendance/AttendanceList";
import MarkAttendance from "../modules/hrm/pages/attendance/MarkAttendance";

// Documents
import DocumentUpload from "../modules/hrm/pages/documents/DocumentUpload";
import DocumentList from "../modules/hrm/pages/documents/DocumentList";

// Salaries
import SalaryList from "../modules/hrm/pages/salaries/SalaryList";
import AddSalary from "../modules/hrm/pages/salaries/AddSalary";

export default function HrmRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute allowedRoles={["SuperAdmin", "HR Manager"]} />}>
        
        {/* Dashboard */}
        <Route index element={<HrmDashboard />} />

        {/* Departments */}
        <Route path="departments" element={<DepartmentList />} />
        <Route path="departments/add" element={<AddDepartment />} />

        {/* Employees */}
        <Route path="employees" element={<EmployeeList />} />
        <Route path="employees/add" element={<AddEmployee />} />

        {/* Attendance */}
        <Route path="attendance" element={<AttendanceList />} />
        <Route path="attendance/mark" element={<MarkAttendance />} />

        {/* Documents */}
        <Route path="documents" element={<DocumentList />} />
        <Route path="documents/upload" element={<DocumentUpload />} />

        {/* Salaries */}
        <Route path="salaries" element={<SalaryList />} />
        <Route path="salaries/add" element={<AddSalary />} />

      </Route>
    </Routes>
  );
}
