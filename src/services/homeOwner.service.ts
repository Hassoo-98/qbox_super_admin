import api from "../lib/axios";
import { normalizeApiError } from "../lib/apiError";
import type {
  GetAllHomeownersParams,
  GetAllHomeOwnersResponse,
  GetSingleOrDeleteOrStatusResponse,
} from "../types/AllQboxTypes";

export const HomeownerService = {

  // ===============================
  // 🔹 GET ALL HOMEOWNERS
  // ===============================
  getAllHomeowners: async (
    params: GetAllHomeownersParams
  ): Promise<GetAllHomeOwnersResponse> => {
    try {
      const { data } = await api.get("/home_owner/", { params });
      return data;
    } catch (error) {
      normalizeApiError(error);
      throw error;
    }
  },

  // ===============================
  // 🔹 GET SINGLE HOMEOWNER
  // ===============================
  getSingleHomeowner: async (
    id: string
  ): Promise<GetSingleOrDeleteOrStatusResponse> => {
    try {
      const { data } = await api.get(`/home_owner/${id}`);
      return data;
    } catch (error) {
      normalizeApiError(error);
      throw error;
    }
  },

  // ===============================
  // 🔹 CREATE HOMEOWNER
  // ===============================
  createHomeowner: async (payload: any) => {
    try {
      const { data } = await api.post("/home_owner/create", payload);
      return data;
    } catch (error) {
      normalizeApiError(error);
      throw error;
    }
  },

  // ===============================
  // 🔹 UPDATE HOMEOWNER (PATCH)
  // ===============================
  updateHomeowner: async (
    id: string,
    payload: any
  ) => {
    try {
      const { data } = await api.patch(`/home_owner/${id}/update`, payload);
      return data;
    } catch (error) {
      normalizeApiError(error);
      throw error;
    }
  },

  // ===============================
  // 🔹 UPDATE HOMEOWNER (PUT)
  // ===============================
  updateHomeownerFull: async (
    id: string,
    payload: any
  ) => {
    try {
      const { data } = await api.put(`/home_owner/${id}/update`, payload);
      return data;
    } catch (error) {
      normalizeApiError(error);
      throw error;
    }
  },

  // ===============================
  // 🔹 CHANGE STATUS
  // ===============================
  changeHomeownerStatus: async (
    id: string,
    payload: { is_active: boolean }
  ): Promise<GetSingleOrDeleteOrStatusResponse> => {
    try {
      const { data } = await api.patch(`/home_owner/${id}/status`, payload);
      return data;
    } catch (error) {
      normalizeApiError(error);
      throw error;
    }
  },

  // ===============================
  // 🔹 DELETE HOMEOWNER
  // ===============================
  deleteHomeowner: async (
    id: string
  ): Promise<GetSingleOrDeleteOrStatusResponse> => {
    try {
      const { data } = await api.delete(`/home_owner/${id}/delete`);
      return data;
    } catch (error) {
      normalizeApiError(error);
      throw error;
    }
  },

  // ===============================
  // 🔹 ACCOUNT APPROVAL LIST
  // ===============================
  getAccountApprovalList: async (params?: any) => {
    try {
      const { data } = await api.get(
        "/home_owner/account-approval/list",
        { params }
      );
      return data;
    } catch (error) {
      normalizeApiError(error);
      throw error;
    }
  },

  // ===============================
  // 🔹 UPDATE ACCOUNT APPROVAL
  // ===============================
  updateAccountApproval: async (
    id: string,
    payload: any
  ) => {
    try {
      const { data } = await api.patch(
        `/home_owner/account-approval/${id}/update`,
        payload
      );
      return data;
    } catch (error) {
      normalizeApiError(error);
      throw error;
    }
  },

  // ===============================
  // 🔹 RELOCATION LIST
  // ===============================
  getRelocationList: async (params?: any) => {
    try {
      const { data } = await api.get(
        "/home_owner/relocation/list",
        { params }
      );
      return data;
    } catch (error) {
      normalizeApiError(error);
      throw error;
    }
  },

  // ===============================
  // 🔹 UPDATE RELOCATION
  // ===============================
  updateRelocation: async (
    id: string,
    payload: any
  ) => {
    try {
      const { data } = await api.patch(
        `/home_owner/relocation/${id}/update`,
        payload
      );
      return data;
    } catch (error) {
      normalizeApiError(error);
      throw error;
    }
  },

};