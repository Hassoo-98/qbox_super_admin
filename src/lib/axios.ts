import axios from "axios";
import {
  getBearerToken,
  getRefreshToken,
  getTokenExpiry,
  setTokenAndExpiry,
} from "./user";

let isRefreshing = false;
const refreshSubscribers: ((token: string) => void)[] = [];

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});
const apiRefresh = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers.length = 0;
};

const isTokenExpired = () => {
  const expiry = getTokenExpiry();
  if (!expiry) return true;
  return Date.now() > Number(expiry);
};

const refreshToken = async () => {
  try {
    const refreshTokenValue = getRefreshToken();
    if (!refreshTokenValue) throw new Error("No refresh token");

    const { data } = await apiRefresh.post("/refreshToken", {
      refreshToken: refreshTokenValue,
    });

    const result = data.user;
    setTokenAndExpiry(result.token, result.refreshToken, result.tokenExpiry);

    onRefreshed(result.token);
    return result.token;
  } catch (err) {
    localStorage.clear();
    window.location.href = "/";
    throw err;
  } finally {
    isRefreshing = false;
  }
};

api.interceptors.request.use(async (config) => {
  const token = getBearerToken();

  if (token && isTokenExpired()) {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshToken();
    }

    return new Promise((resolve) => {
      subscribeTokenRefresh((newToken) => {
        config.headers.Authorization = `Bearer ${newToken}`;
        resolve(config);
      });
    });
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
