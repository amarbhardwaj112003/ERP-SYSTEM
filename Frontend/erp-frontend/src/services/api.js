import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach access token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh");
      if (refreshToken) {
        try {
          const res = await axios.post(`${BASE_URL}/token/refresh/`, {
            refresh: refreshToken,
          });
          localStorage.setItem("access", res.data.access);
          originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
          return api(originalRequest);
        } catch (err) {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          window.location.href = "/login"; // redirect to login
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
