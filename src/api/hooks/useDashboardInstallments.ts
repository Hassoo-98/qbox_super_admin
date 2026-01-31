import { useQuery } from "@tanstack/react-query";
import { adminService } from "../services/adminService";
import { queryKeys } from "../queryKeys";

export const useDashboardInstallments = () => {
  return useQuery({
    queryKey: queryKeys.admin.installments(),
    queryFn: adminService.getDashboardInstallments,
  });
};
