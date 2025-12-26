import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../auth/ProtectedRoute';
import LoginPage from '../auth/LoginPage';
import Unauthorized from '../auth/Unauthorized';

import AdminLayout from '../layouts/AdminLayout';
import HRLayout from '../layouts/HRLayout';
import ManagerLayout from '../layouts/ManagerLayout';
import EmployeeLayout from '../layouts/EmployeeLayout';

import AdminDashboard from '../modules/admin/Dashboard';
import HRDashboard from '../modules/hrm/Dashboard';

import DepartmentList from "../modules/hrm/pages/departments/DepartmentList.jsx";
import AddDepartment from "../modules/hrm/pages/departments/AddDepartment.jsx";

import EmployeeList from '../modules/hrm/pages/employees/EmployeeList';
import AddEmployee from '../modules/hrm/pages/employees/AddEmployee';

import AttendanceList from '../modules/hrm/pages/attendance/AttendanceList';
import MarkAttendance from '../modules/hrm/pages/attendance/MarkAttendance';   // ✅ added

import LeaveList from '../modules/hrm/pages/leaves/LeaveList';
import SalaryList from '../modules/hrm/pages/salary/SalaryList';
import DocumentList from '../modules/hrm/pages/documents/DocumentList';

import OrdersDashboard from '../modules/orders/Dashboard';
import CustomerUI from '../modules/orders/Dashboard';
import InventoryDashboard from '../modules/inventory/Dashboard';
import FinanceDashboard from '../modules/finance/Dashboard';
import CRMDashboard from '../modules/crm/Dashboard';

import { ROLES } from '../utils/roles';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* ========================= SUPERADMIN ========================= */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.SUPERADMIN]} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/finance/dashboard" element={<FinanceDashboard />} />
          <Route path="/crm/dashboard" element={<CRMDashboard />} />
        </Route>
      </Route>

      {/* ========================= HR MANAGER ========================= */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.SUPERADMIN, ROLES.HR]} />}>
        <Route element={<HRLayout />}>

          <Route path="/hr/dashboard" element={<HRDashboard />} />

          {/* Departments */}
          <Route path="/hr/departments" element={<DepartmentList />} />
          <Route path="/hr/departments/add" element={<AddDepartment />} />

          {/* Employees */}
          <Route path="/hr/employees" element={<EmployeeList />} />
          <Route path="/hr/employees/add" element={<AddEmployee />} />

          {/* Attendance */}
          <Route path="/hr/attendance" element={<AttendanceList />} />
          <Route path="/hr/attendance/mark" element={<MarkAttendance />} />  {/* ✅ FIXED */}

          {/* Leaves */}
          <Route path="/hr/leaves" element={<LeaveList />} />

          {/* Salary */}
          <Route path="/hr/salaries" element={<SalaryList />} />

          {/* Documents */}
          <Route path="/hr/documents" element={<DocumentList />} />

        </Route>
      </Route>

      {/* ========================= MANAGER ========================= */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.SUPERADMIN, ROLES.MANAGER]} />}>
        <Route element={<ManagerLayout />}>
          <Route path="/orders/dashboard" element={<OrdersDashboard />} />
          <Route path="/inventory/dashboard" element={<InventoryDashboard />} />
        </Route>
      </Route>

      {/* ========================= EMPLOYEE ========================= */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.SUPERADMIN, ROLES.EMPLOYEE]} />}>
        <Route element={<EmployeeLayout />}>
          <Route path="/orders/customer" element={<CustomerUI />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
