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

      {/* SuperAdmin */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.SUPERADMIN]} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/finance/dashboard" element={<FinanceDashboard />} />
          <Route path="/crm/dashboard" element={<CRMDashboard />} />
        </Route>
      </Route>

      {/* HR Manager */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.SUPERADMIN, ROLES.HR]} />}>
        <Route element={<HRLayout />}>
          <Route path="/hr/dashboard" element={<HRDashboard />} />
        </Route>
      </Route>

      {/* Manager */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.SUPERADMIN, ROLES.MANAGER]} />}>
        <Route element={<ManagerLayout />}>
          <Route path="/orders/dashboard" element={<OrdersDashboard />} />
          <Route path="/inventory/dashboard" element={<InventoryDashboard />} />
        </Route>
      </Route>

      {/* Employee */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.SUPERADMIN, ROLES.EMPLOYEE]} />}>
        <Route element={<EmployeeLayout />}>
          <Route path="/orders/customer" element={<CustomerUI />} />
          {/* add /hr/employee-profile when available */}
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
