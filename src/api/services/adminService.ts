import apiClient from "../apiClient";
import type { HomeOwner, ApiResponse } from "../types/admin";

export const adminService = {
  getHomeOwners: async (): Promise<HomeOwner[]> => {
    const response =
      await apiClient.get<ApiResponse<HomeOwner[]>>("/admin/home_owners");
    return (response as any).data || response;
  },
};
