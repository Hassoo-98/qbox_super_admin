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
