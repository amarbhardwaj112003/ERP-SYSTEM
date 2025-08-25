import { createContext, useContext, useMemo, useState } from 'react';
import { roleHome } from '../utils/roles';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [access, setAccess] = useState(localStorage.getItem('access') || null);
  const [refresh, setRefresh] = useState(localStorage.getItem('refresh') || null);

  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    if (!raw || raw === 'undefined') return null; // avoid invalid value
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.error('Invalid user in localStorage:', e);
      return null;
    }
  });

  const login = ({ access, refresh, user }) => {
    setAccess(access || null);
    setRefresh(refresh || null);
    setUser(user || null);

    if (access) localStorage.setItem('access', access);
    if (refresh) localStorage.setItem('refresh', refresh);
    if (user) localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setAccess(null);
    setRefresh(null);
    setUser(null);
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');
  };

  // Default home route based on role
  const home = user?.role ? roleHome[user.role] : '/login';

  const value = useMemo(
    () => ({ access, refresh, user, login, logout, home }),
    [access, refresh, user, home]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
