// src/components/UserManagement.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import api from '../services/api';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    userID: '',
    password: '',
    role: 'Employee',
    email: '',
    status: 'Active',
  });
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('users/')
      .then(response => setUsers(response.data))
      .catch(err => setError('Failed to load users: ' + (err.response?.data?.detail || 'Unknown error')));
  }, []);

  const createUser = () => {
    if (!newUser.userID || !newUser.password || !newUser.email) {
      setError('All fields are required');
      return;
    }
    api.post('users/create/', newUser)
      .then(response => {
        setUsers([...users, response.data]);
        setNewUser({ userID: '', password: '', role: 'Employee', email: '', status: 'Active' });
        setError('');
      })
      .catch(err => setError('Failed to create user: ' + (err.response?.data?.detail || 'Unknown error')));
  };

  const updateUser = (id, updatedData) => {
    api.patch(`users/${id}/`, updatedData)
      .then(response => {
        setUsers(users.map(u => (u.id === id ? response.data : u)));
        setError('');
      })
      .catch(err => setError('Failed to update user: ' + (err.response?.data?.detail || 'Unknown error')));
  };

  const deleteUser = (id) => {
    api.delete(`users/${id}/delete/`)
      .then(() => {
        setUsers(users.filter(u => u.id !== id));
        setError('');
      })
      .catch(err => setError('Failed to delete user: ' + (err.response?.data?.detail || 'Unknown error')));
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h2>
        <div className="space-x-2">
          <button
            onClick={() => navigate('/admin')}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => document.documentElement.classList.toggle('dark')}
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
          >
            Toggle Dark Mode
          </button>
        </div>
      </div>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Create User</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            value={newUser.userID}
            onChange={(e) => setNewUser({ ...newUser, userID: e.target.value })}
            placeholder="User ID"
            className="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            placeholder="Password"
            className="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            placeholder="Email"
            className="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="SuperAdmin">SuperAdmin</option>
            <option value="HRManager">HR Manager</option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
          </select>
          <select
            value={newUser.status}
            onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
            className="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button
          onClick={createUser}
          className="mt-4 bg-primary text-white p-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Create User
        </button>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Users</h3>
        {users.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No users found</p>
        ) : (
          <ul className="space-y-2">
            {users.map(u => (
              <li key={u.id} className="flex items-center justify-between p-2 border-b dark:border-gray-700">
                <div className="flex-1">
                  <span className="text-gray-900 dark:text-white font-medium">{u.userID}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">({u.role})</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">{u.email}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">{u.status}</span>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => updateUser(u.id, { status: u.status === 'Active' ? 'Inactive' : 'Active' })}
                    className="text-blue-500 hover:underline"
                  >
                    Toggle Status
                  </button>
                  <button
                    onClick={() => deleteUser(u.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}