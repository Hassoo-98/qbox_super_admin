import api from "../lib/axios";
import { normalizeApiError } from "../lib/apiError";

export const AuthService = {
  login: async (
    payload: {
      email: string;
      password: string
    }
  ): Promise<any> => {
    try {
      const { data } = await api.post("/auth/login", payload);
      return data;
    } catch (error) {
      normalizeApiError(error);
    }
  },
  
  user: async (): Promise<any> => {
    try {
      const { data } = await api.get("/auth/profile/");
      return data;
    } catch (error) {
      normalizeApiError(error);
    }
  }
};
