import { NavLink } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { ROLES } from '../utils/roles';
import {
  HomeIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  ShoppingCartIcon,
  CubeIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftRightIcon,
  MegaphoneIcon,
  ArrowRightOnRectangleIcon // <- fixed logout icon
} from '@heroicons/react/24/outline';

// Sidebar link generator
const sidebarLink = (to, label, Icon, color) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:bg-gradient-to-r hover:from-${color}-100 hover:to-${color}-200 ${
        isActive
          ? `bg-gradient-to-r from-${color}-500 to-${color}-600 text-white`
          : `text-gray-700`
      }`
    }
  >
    {({ isActive }) => (
      <>
        <Icon className={`w-6 h-6 ${isActive ? 'text-white' : `text-${color}-600`}`} />
        <span className="font-medium">{label}</span>
      </>
    )}
  </NavLink>
);

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 shrink-0 border-r bg-white h-full flex flex-col shadow-lg">
      {/* Header */}
      <div className="p-4 border-b flex flex-col">
        <div className="text-2xl font-bold text-indigo-600">ERP System</div>
        <div className="text-sm text-gray-500 mt-1">
          {user?.username} · <span className="capitalize">{user?.role}</span>
        </div>
      </div>

      {/* Links */}
      <div className="p-3 space-y-2 flex-1 overflow-y-auto">
        {user?.role === ROLES.SUPERADMIN && (
          <>
            {sidebarLink('/admin/dashboard', 'Admin Dashboard', HomeIcon, 'indigo')}
            {sidebarLink('/hr/dashboard', 'HRM', UsersIcon, 'green')}
            {sidebarLink('/orders/dashboard', 'Orders', ShoppingCartIcon, 'yellow')}
            {sidebarLink('/inventory/dashboard', 'Inventory', CubeIcon, 'purple')}
            {sidebarLink('/finance/dashboard', 'Finance', CurrencyDollarIcon, 'teal')}
            {sidebarLink('/crm/dashboard', 'CRM', ChatBubbleLeftRightIcon, 'pink')}
          </>
        )}

        {user?.role === ROLES.HR && (
          <>
            {sidebarLink('/hr/dashboard', 'HRM', UsersIcon, 'green')}
            {sidebarLink('/inventory/dashboard', 'Inventory', CubeIcon, 'purple')}
            {sidebarLink('/supply/dashboard', 'Supply', ClipboardDocumentListIcon, 'yellow')}
          </>
        )}

        {user?.role === ROLES.MANAGER && (
          <>
            {sidebarLink('/orders/dashboard', 'Orders', ShoppingCartIcon, 'yellow')}
            {sidebarLink('/inventory/dashboard', 'Inventory', CubeIcon, 'purple')}
            {sidebarLink('/supply/dashboard', 'Supply', ClipboardDocumentListIcon, 'teal')}
          </>
        )}

        {user?.role === ROLES.EMPLOYEE && (
          <>
            {sidebarLink('/orders/customer', 'Customer UI', HomeIcon, 'blue')}
            {sidebarLink('/hr/employee-profile', 'My Profile', UsersIcon, 'green')}
          </>
        )}
      </div>

      {/* Logout */}
      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 justify-center py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
