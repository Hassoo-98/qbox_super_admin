import { useQuery, useMutation } from "@tanstack/react-query";
import { StaffService } from "../services/staff.service";

interface GetAllStaffParams {
  search: string;
  ordering: string;
  role: string;
  is_active: string;
  page: number;
  limit: number;
}

type CreateStaffPayload = Omit<Parameters<typeof StaffService.createStaff>[0], 'id' | 'is_staff'>;

interface StaffResponse {
  id: string;
  name: string;
  phone_number: string;
  email: string;
  role: string;
  password?: string;
  is_active: boolean;
  is_staff: boolean;
}

interface StaffListResponse {
  success: boolean;
  statusCode: number;
  data: {
    items: StaffResponse[];
  };
  total: number;
  page: number;
  message: string;
  limit: number;
  hasMore: boolean;
}

export const useStaff = (params?: GetAllStaffParams) => {
  const staffQuery = useQuery({
    queryKey: ["staff", params],
    queryFn: () => StaffService.getAllStaff(params as GetAllStaffParams),
    enabled: !!params, 
    staleTime: 0,
    gcTime: 0,
  });


  const getSingleMutation = useMutation({
    mutationFn: (id: string) => StaffService.getSingleStaff(id),
  });
  const createMutation = useMutation({
    mutationFn: (payload: CreateStaffPayload) => StaffService.createStaff(payload as any),
  });
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<StaffResponse>;
    }) => StaffService.UpdateStaff(id, payload as any),
  });

  const changeStatusMutation = useMutation({
    mutationFn: ({
      id,
      is_active,
    }: {
      id: string;
      is_active: boolean;
    }) =>
      StaffService.ChangeStatusStaff(id, {
        is_active,
      }),
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) => StaffService.DeleteStaff(id),
  });

  return {
    // data
    staffList: staffQuery.data as StaffListResponse | undefined,
    isLoadingStaffList: staffQuery.isLoading,
    staffListError: staffQuery.error,

    // actions
    getStaff: getSingleMutation.mutate,
    createStaff: createMutation.mutate,
    updateStaff: updateMutation.mutate,
    changeStaffStatus: changeStatusMutation.mutate,
    deleteStaff: deleteMutation.mutate,

    // loading states
    isGettingStaff: getSingleMutation.isPending,
    isCreatingStaff: createMutation.isPending,
    isUpdatingStaff: updateMutation.isPending,
    isChangingStatus: changeStatusMutation.isPending,
    isDeletingStaff: deleteMutation.isPending,

    // errors
    getStaffError: getSingleMutation.error,
    createStaffError: createMutation.error,
    updateStaffError: updateMutation.error,
    changeStatusError: changeStatusMutation.error,
    deleteStaffError: deleteMutation.error,
  };
};
