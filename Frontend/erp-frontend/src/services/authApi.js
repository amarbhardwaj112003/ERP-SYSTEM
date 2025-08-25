import api from './axiosInstance';

export async function login(username, password) {
  const res = await api.post('/auth/login/', { username, password });
  // Support both shapes: {access} or {token}
  const access = res.data.access || res.data.token;
  const refresh = res.data.refresh;
  const role = res.data.role || 'employee';
  const user = {
    id: res.data.user_id,
    username: res.data.username,
    email: res.data.email,
    role,
  };
  return { access, refresh, user };
}
