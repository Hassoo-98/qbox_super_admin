import axios from "axios";

const api = axios.create({
  baseURL: "https://backend.qbox.sa/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true
});

export default api;
