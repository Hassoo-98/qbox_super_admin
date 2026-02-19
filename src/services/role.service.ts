import api from "../lib/axios";
import { normalizeApiError } from "../lib/apiError";

interface GetAllRolesParams {
  search?: string;
  is_active?: string;
  page?: number;
  limit?: number;
}

export interface Role {
  uuid: string;
  name: string;
  is_active: boolean;
  permissions?: string[];
  created_at?: string;
}

interface RoleListData {
  items: Role[];
  total: number;
  page: number;
  limit: number;
}

interface GetRoleListResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: RoleListData;
}

interface CrudRoleResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Role;
}

export const RolesService = {
  getAllRoles: async (
    params: GetAllRolesParams
  ): Promise<GetRoleListResponse> => {
    try {
      const { data } = await api.get("/roles/", { params });
      return data;
    } catch (error) {
      normalizeApiError(error);
      throw error;
    }
  },

  createRole: async (payload: Partial<Role>): Promise<CrudRoleResponse> => {
    try {
      const { data } = await api.post("/roles/", payload);
      return data;
    } catch (error) {
      normalizeApiError(error);
      throw error;
    }
  },

  getSingleRole: async (uuid: string): Promise<CrudRoleResponse> => {
    try {
      const { data } = await api.get(`/roles/${uuid}`);
      return data;
    } catch (error) {
      normalizeApiError(error);
      throw error;
    }
  },

  updateRole: async (
    uuid: string,
    payload: Partial<Role>
  ): Promise<CrudRoleResponse> => {
    try {
      const { data } = await api.patch(`/roles/${uuid}`, payload);
      return data;
    } catch (error) {
      normalizeApiError(error);
      throw error;
    }
  },

  replaceRole: async (
    uuid: string,
    payload: Partial<Role>
  ): Promise<CrudRoleResponse> => {
    try {
      const { data } = await api.put(`/roles/${uuid}`, payload);
      return data;
    } catch (error) {
      normalizeApiError(error);
      throw error;
    }
  },

  changeRoleStatus: async (
    uuid: string,
    payload: { is_active: boolean }
  ): Promise<CrudRoleResponse> => {
    try {
      const { data } = await api.patch(`/roles/${uuid}/status`, payload);
      return data;
    } catch (error) {
      normalizeApiError(error);
      throw error;
    }
  },

  updateRolePermissions: async (
    uuid: string,
    payload: { permissions: string[] }
  ): Promise<CrudRoleResponse> => {
    try {
      const { data } = await api.patch(
        `/roles/roles-permissions/${uuid}`,
        payload
      );
      return data;
    } catch (error) {
      normalizeApiError(error);
      throw error;
    }
  },

  deleteRole: async (uuid: string): Promise<void> => {
    try {
      await api.delete(`/roles/${uuid}`);
    } catch (error) {
      normalizeApiError(error);
      throw error;
    }
  },
};
