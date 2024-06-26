import axios from 'axios';

// Instancia general
export const api = axios.create({
  baseURL: import.meta.env.VITE_TAXCOLOMBIA_API || "http://localhost:8000/api/",
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('auth_tokens'));
  config.headers.Authorization =  token ? `Bearer ${token.access}` : '';
  return config;
});
