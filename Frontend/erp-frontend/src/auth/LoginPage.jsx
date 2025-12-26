// src/components/LoginPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../services/authApi';
import { useAuth } from './useAuth';
import { LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';

export default function LoginPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const { login, home } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      const data = await loginApi(userId, password);
      login(data);
      navigate(home, { replace: true });
    } catch (error) {
      setErr(error?.response?.data?.detail || error?.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel: Animated Gradient */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 relative overflow-hidden">
        <div className="absolute inset-0 animate-gradient-slow opacity-30"></div>
        <div className="z-10 max-w-md text-white px-6">
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">ERP Platform</h1>
          <p className="text-lg text-indigo-100 drop-shadow-sm">
            Unified control over HRM, Orders, Inventory, Finance & CRM — real-time, role-based, blazing fast.
          </p>
        </div>
      </div>

      {/* Right Panel: Login Card */}
      <div className="flex flex-1 items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
        <form
          onSubmit={onSubmit}
          className="relative w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-10 shadow-2xl transform transition-all duration-500 hover:scale-105 hover:rotate-1"
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">Sign in</h2>

          {err && (
            <div className="mb-6 p-3 text-sm rounded bg-red-50 text-red-700 border border-red-200 animate-pulse">
              {err}
            </div>
          )}

          {/* User ID Field */}
          <div className="relative mb-6">
            <UserIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="User ID"
              required
              className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-transparent peer transition"
            />
            <label className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 text-sm peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-indigo-500 peer-focus:text-sm transition-all">
              User ID
            </label>
          </div>

          {/* Password Field */}
          <div className="relative mb-8">
            <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-transparent peer transition"
            />
            <label className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 text-sm peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-indigo-500 peer-focus:text-sm transition-all">
              Password
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white font-semibold text-lg shadow-md hover:shadow-lg hover:scale-105 transition transform disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>

          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
            Access is role-based. Contact Admin/HR for credentials.
          </p>
        </form>
      </div>
    </div>
  );
}
