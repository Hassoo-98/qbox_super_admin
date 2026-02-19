import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { StaffService } from "../services/staff.service";

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
    keepPreviousData: true, // keeps old data while fetching new page
  });

  // ✅ Helper for safe invalidation
  const invalidateStaffList = () => {
    queryClient.invalidateQueries({
      queryKey: ["staff", params],
      exact: true, // only invalidate this specific query
    });
  };

  // Create staff mutation
  const createMutation = useMutation({
    mutationFn: (payload: any) => StaffService.createStaff(payload),
    onSuccess: invalidateStaffList,
  });

  // Update staff mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) => 
      StaffService.UpdateStaff(id, payload),
    onSuccess: invalidateStaffList,
  });

  // Change status mutation
  const changeStatusMutation = useMutation({
    mutationFn: ({ id, is_active }: { id: string; is_active: boolean }) => 
      StaffService.ChangeStatusStaff(id, { is_active }),
    onMutate: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      await queryClient.cancelQueries({ queryKey: ["staff", params], exact: true });

      const previous = queryClient.getQueryData<any>(["staff", params]);
      queryClient.setQueryData(["staff", params], (old: any) => {
        if (!old) return old;
        const items = Array.isArray(old.data?.items) ? old.data.items : [];
        const newItems = items.map((it: any) => (it.id === id ? { ...it, is_active } : it));
        return { ...old, data: { ...old.data, items: newItems } };
      });
      return { previous };
    },
    onError: (_err, _variables, context: any) => {
      if (context?.previous) {
        queryClient.setQueryData(["staff", params], context.previous);
      }
    },
    onSuccess: invalidateStaffList,
  });

  // Delete staff mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => StaffService.DeleteStaff(id),
    onSuccess: invalidateStaffList,
  });

  return {
    staffList,
    isLoadingStaffList,
    staffListError,
    createStaff: createMutation.mutateAsync,
    updateStaff: updateMutation.mutateAsync,
    changeStaffStatus: changeStatusMutation.mutateAsync,
    deleteStaff: deleteMutation.mutateAsync,
    isCreatingStaff: createMutation.isPending,
    isUpdatingStaff: updateMutation.isPending,
    isChangingStatus: changeStatusMutation.isPending,
    isDeletingStaff: deleteMutation.isPending,
  };
};
