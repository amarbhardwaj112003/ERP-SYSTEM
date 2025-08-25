import { NavLink } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { ROLES } from '../utils/roles';

const link = (to, label) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block px-3 py-2 rounded hover:bg-gray-100 ${isActive ? 'bg-gray-200 font-medium' : ''}`
    }
  >
    {label}
  </NavLink>
);

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 shrink-0 border-r bg-white h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="text-lg font-semibold">ERP</div>
        <div className="text-xs text-gray-500">{user?.username} · {user?.role}</div>
      </div>
      <div className="p-3 space-y-1 overflow-y-auto">
        {user?.role === ROLES.SUPERADMIN && (
          <>
            {link('/admin/dashboard', 'Admin Dashboard')}
            {link('/hr/dashboard', 'HRM')}
            {link('/orders/dashboard', 'Orders')}
            {link('/inventory/dashboard', 'Inventory')}
            {link('/finance/dashboard', 'Finance')}
            {link('/crm/dashboard', 'CRM')}
          </>
        )}
        {user?.role === ROLES.HR && (
          <>
            {link('/hr/dashboard', 'HRM')}
            {link('/inventory/dashboard', 'Inventory')}
            {link('/supply/dashboard', 'Supply')}
          </>
        )}
        {user?.role === ROLES.MANAGER && (
          <>
            {link('/orders/dashboard', 'Orders')}
            {link('/inventory/dashboard', 'Inventory')}
            {link('/supply/dashboard', 'Supply')}
          </>
        )}
        {user?.role === ROLES.EMPLOYEE && (
          <>
            {link('/orders/customer', 'Customer UI')}
            {link('/hr/employee-profile', 'My Profile')}
          </>
        )}
      </div>
      <div className="mt-auto p-3 border-t">
        <button onClick={logout} className="w-full py-2 rounded border hover:bg-gray-50">Logout</button>
      </div>
    </aside>
  );
}
