import axios from "axios";

// DEV: use /api so Vite proxies to localhost:8080
// PROD: use your deployed backend (from .env)
const api = axios.create({
  baseURL: import.meta.env.DEV ? "/api" : import.meta.env.VITE_BACKEND_URL,
});

api.interceptors.request.use((config) => {
  if (!config.headers?.Authorization) {
    const stored = localStorage.getItem("JWT_TOKEN");
    if (stored) {
      const token = JSON.parse(stored);
      if (token) {
        config.headers = { ...(config.headers || {}), Authorization: `Bearer ${token}` };
      }
    }
  }
  return config;
});

export default api;
