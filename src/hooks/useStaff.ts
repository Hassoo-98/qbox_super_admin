import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { StaffService } from "../services/staff.service";
import type { staffType } from "../types";

interface GetAllStaffParams {
  search?: string;
  ordering?: string;
  role?: string;
  is_active?: string;
  page?: number;
  limit?: number;
}

export const useStaff = (params?: GetAllStaffParams) => {
  const queryClient = useQueryClient();

  // Fetch staff list
  const { data: staffList, isLoading: isLoadingStaffList, error: staffListError } = useQuery({
    queryKey: ["staff", params],
    queryFn: () => StaffService.getAllStaff(params as GetAllStaffParams),
  });

  // Create staff mutation
  const createMutation = useMutation({
    mutationFn: (payload: any) => StaffService.createStaff(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
    },
  });

  // Update staff mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) => 
      StaffService.UpdateStaff(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
    },
  });

  // Change status mutation
  const changeStatusMutation = useMutation({
    mutationFn: ({ id, is_active }: { id: string; is_active: boolean }) => 
      StaffService.ChangeStatusStaff(id, { is_active }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
    },
  });

  // Delete staff mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => StaffService.DeleteStaff(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
    },
  });

  return {
    staffList,
    isLoadingStaffList,
    staffListError,
    createStaff: createMutation.mutate,
    updateStaff: updateMutation.mutate,
    changeStaffStatus: changeStatusMutation.mutate,
    deleteStaff: deleteMutation.mutate,
    isCreatingStaff: createMutation.isPending,
    isUpdatingStaff: updateMutation.isPending,
    isChangingStatus: changeStatusMutation.isPending,
    isDeletingStaff: deleteMutation.isPending,
  };
};
