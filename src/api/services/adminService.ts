import apiClient from "../apiClient";
import type { HomeOwner, ApiResponse, Installment } from "../types/admin";

export const adminService = {
  getHomeOwners: async (): Promise<HomeOwner[]> => {
    const response =
      await apiClient.get<ApiResponse<HomeOwner[]>>("/admin/home_owners");
    return (response as any).data || response;
  },
  getDashboardInstallments: async (): Promise<Installment[]> => {
    const response = await apiClient.get<ApiResponse<Installment[]>>(
      "/admin/dashboard/installments",
    );
    return (response as any).data || response;
  },
};
