import axios from "axios";

const api = axios.create({
  baseURL: "/api",  
  headers: { "Content-Type": "application/json" },
  withCredentials: true,  
});

api.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config;
});

export default api;
