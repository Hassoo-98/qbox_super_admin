import { useQuery } from "@tanstack/react-query";
import { adminService } from "../services/adminService";
import { queryKeys } from "../queryKeys";

/**
 * Hook to fetch the list of Home Owners from the admin panel.
 */
export const useHomeOwners = () => {
  return useQuery({
    queryKey: queryKeys.admin.homeOwners(),
    queryFn: () => adminService.getHomeOwners(),
    // Keep data fresh for 5 minutes
    staleTime: 1000 * 60 * 5,
  });
};
