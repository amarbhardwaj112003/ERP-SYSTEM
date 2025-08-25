// src/components/AdminDashboard.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

export default function AdminDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const modules = [
    { name: 'HRM', path: '/hr' },
    { name: 'Order Management', path: '/orders' },
    { name: 'Inventory', path: '/inventory' },
    { name: 'Supply Chain', path: '/supply' },
    { name: 'Finance', path: '/finance' },
    { name: 'CRM', path: '/crm' },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <div className="space-x-2">
          <button
            onClick={() => logout()}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
          <button
            onClick={() => document.documentElement.classList.toggle('dark')}
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
          >
            Toggle Dark Mode
          </button>
        </div>
      </div>
      <div className="mb-6">
        <button
          onClick={() => navigate('/users')}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Manage Users
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map(module => (
          <div
            key={module.name}
            onClick={() => navigate(module.path)}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition duration-200"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{module.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}