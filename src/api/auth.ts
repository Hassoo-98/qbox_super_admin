import { request } from "./http";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  user?: Record<string, unknown>;
  [key: string]: unknown;
};

export const login = (payload: LoginRequest) =>
  request<LoginResponse>("/auth/login", {
    method: "POST",
    body: payload,
  });

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  [key: string]: unknown;
};

export const register = (payload: RegisterRequest) =>
  request<LoginResponse>("/auth/register", {
    method: "POST",
    body: payload,
  });
