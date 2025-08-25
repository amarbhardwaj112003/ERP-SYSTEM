import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../services/authApi';
import { useAuth } from './useAuth';

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
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left: branding */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-black to-gray-700 p-10">
        <div className="max-w-md text-white">
          <h1 className="text-4xl font-bold mb-3">ERP Platform</h1>
          <p className="text-gray-200">
            Unified control over HRM, Orders, Inventory, Finance & CRM — real-time, role-based, and blazing fast.
          </p>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex items-center justify-center p-6">
        <form className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-8 shadow-sm" onSubmit={onSubmit}>
          <h2 className="text-2xl font-semibold mb-6">Sign in</h2>

          {err && <div className="mb-4 p-3 text-sm rounded bg-red-50 text-red-700 border border-red-200">{err}</div>}

          <label className="block text-sm font-medium mb-1">User ID</label>
          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring"
            placeholder="e.g. admin001"
            required
          />

          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 px-3 py-2 border rounded focus:outline-none focus:ring"
            placeholder="••••••••"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded bg-black text-white hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>

          <p className="text-xs text-gray-500 mt-4">
            Access is role-based. Contact Admin/HR for your credentials.
          </p>
        </form>
      </div>
    </div>
  );
}
try {
  const res = await login({ username, password });
  // Save token
} catch (err) {
  if (err.response) {
    alert("Login failed: " + JSON.stringify(err.response.data));
  } else {
    alert("Server error");
  }
}
