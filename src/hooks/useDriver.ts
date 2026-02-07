import { useMutation, useQuery } from "@tanstack/react-query";
import { DriverService } from "../services/driver.service";

interface QueryParams {
  search: string;
  is_active: boolean;
  page: number;
  limit: number;
}

interface DriverResponse {
  id: string;
  image: string;
  driver_name: string;
  phone_number: string;
  email: string;
  is_active: boolean;
  total_deliveries?: string;
  success_rate?: string;
}

interface DriverListResponse {
  success: boolean;
  statusCode: number;
  data: {
    items: DriverResponse[];
  };
  total: number;
  page: number;
  message: string;
  limit: number;
  hasMore: boolean;
}

export const useDriver = (params?: QueryParams) => {
  const driversQuery = useQuery({
    queryKey: ["drivers", params],
    queryFn: () => DriverService.getAll(params as QueryParams),
    enabled: !!params,
    staleTime: 0,
    gcTime: 0,
  });

  const getSingleMutation = useMutation({
    mutationFn: (id: string) => DriverService.getSingle(id),
  });
  const createMutation = useMutation({
    mutationFn: (payload: Omit<DriverResponse, 'id'>) => DriverService.create(payload as any),
  });
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<DriverResponse>;
    }) => DriverService.update(id, payload as any),
  });
  const changeStatusMutation = useMutation({
    mutationFn: ({
      id,
      is_active,
    }: {
      id: string;
      is_active: boolean;
    }) =>
      DriverService.changeStatus(id, {
        is_active,
      }),
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) => DriverService.deleteDriver(id),
  });

  return {
    // data
    drivers: driversQuery.data as DriverListResponse | undefined,
    isLoadingDrivers: driversQuery.isLoading,
    driversError: driversQuery.error,

    // actions
    getDriver: getSingleMutation.mutate,
    createDriver: createMutation.mutate,
    updateDriver: updateMutation.mutate,
    changeDriverStatus: changeStatusMutation.mutate,
    deleteDriver: deleteMutation.mutate,

    // loading states
    isGettingDriver: getSingleMutation.isPending,
    isCreatingDriver: createMutation.isPending,
    isUpdatingDriver: updateMutation.isPending,
    isChangingStatus: changeStatusMutation.isPending,
    isDeletingDriver: deleteMutation.isPending,

    // errors
    getDriverError: getSingleMutation.error,
    createDriverError: createMutation.error,
    updateDriverError: updateMutation.error,
    changeStatusError: changeStatusMutation.error,
    deleteDriverError: deleteMutation.error,
  };
};
