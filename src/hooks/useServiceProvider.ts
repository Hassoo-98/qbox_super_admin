import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
// import { ServiceProviderService } from "../services/serviceProvider";
// import type { ServiceProvider } from "../services/serviceProvider";
import { ServiceProviderService } from "../services/serviceProvider.service";
import type { ServiceProvider } from "../services/serviceProvider.service";

interface GetAllServiceProviderParams {
  search?: string;
  ordering?: string;
  city?: string;
  is_approved?: string; // normalize param name used across components
  page?: number;
  limit?: number;
}
export const useServiceProvider = (
  params?: GetAllServiceProviderParams,
  options?: { enabled?: boolean },
) => {
  const queryClient = useQueryClient();
  // prevent duplicate mutation requests for same resource
  const inFlightIds = useMemo(() => new Set<number>(), []);

  // Stabilize and normalize params to a canonical shape so queryKey stays consistent
  const stableParams = useMemo(() => {
    return {
      search: params?.search ?? "",
      ordering: params?.ordering ?? "",
      city: params?.city ?? "",
      // support both `is_active` and `is_approved` callers
      is_approved: (params as any)?.is_approved ?? (params as any)?.is_active ?? "",
      page: params?.page ?? 1,
      limit: params?.limit ?? 10,
    } as GetAllServiceProviderParams;
  }, [
    params?.search,
    params?.ordering,
    params?.city,
    (params as any)?.is_approved,
    (params as any)?.is_active,
    params?.page,
    params?.limit,
  ]);

  const tupleKey = [
    "service-provider",
    stableParams.search,
    stableParams.ordering,
    stableParams.city,
    stableParams.is_approved,
    stableParams.page,
    stableParams.limit,
  ] as const;

  // Fetch service provider list
  const {
    data: serviceProviderList,
    isLoading: isLoadingServiceProviderList,
    error: serviceProviderListError,
  } = useQuery({
    // use a tuple of primitives so the queryKey is stable and comparable
    queryKey: tupleKey,
    queryFn: () => ServiceProviderService.getAllServiceProvider(stableParams as any),
    // allow consumer to opt-out of auto-fetch when they only need mutations
    enabled: options?.enabled !== false,
  });

  // Create service provider mutation
  const createMutation = useMutation({
    mutationFn: (payload: any) =>
      ServiceProviderService.createServiceProvider(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-provider"] });
    },
  });

  // Update service provider mutation
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: any;
    }) => ServiceProviderService.updateServiceProvider(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-provider"] });
    },
  });

  // Change status mutation (Optimistic Update)
  const changeStatusMutation = useMutation({
    mutationFn: ({
      id,
      is_approved,
    }: {
      id: number;
      is_approved: boolean;
    }) =>
      ServiceProviderService.changeStatusServiceProvider(id, { is_approved }),

    onMutate: async ({
      id,
      is_approved,
    }: {
      id: number;
      is_approved: boolean;
    }) => {
      await queryClient.cancelQueries({ queryKey: tupleKey });

      const previous = queryClient.getQueryData<any>(tupleKey);
      queryClient.setQueryData(tupleKey, (old: any) => {
        if (!old) return old;

        const items = Array.isArray(old.data?.items)
          ? old.data.items
          : [];

        const newItems = items.map((it: ServiceProvider) =>
          it.id === id ? { ...it, is_approved } : it
        );

        return { ...old, data: { ...old.data, items: newItems } };
      });

      return { previous };
    },

    onError: (_err, _variables, context: any) => {
      if (context?.previous) {
        queryClient.setQueryData(tupleKey, context.previous);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-provider"] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      ServiceProviderService.deleteServiceProvider(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-provider"] });
    },
  });

  // wrapper guards to avoid duplicate requests for the same id
  const changeServiceProviderStatus = async ({
    id,
    is_approved,
  }: {
    id: number;
    is_approved: boolean;
  }) => {
    if (inFlightIds.has(id)) return;
    inFlightIds.add(id);
    try {
      await changeStatusMutation.mutateAsync({ id, is_approved });
    } finally {
      inFlightIds.delete(id);
    }
  };

  const deleteServiceProvider = async (id: number) => {
    if (inFlightIds.has(id)) return;
    inFlightIds.add(id);
    try {
      await deleteMutation.mutateAsync(id);
    } finally {
      inFlightIds.delete(id);
    }
  };

  return {
    serviceProviderList,
    isLoadingServiceProviderList,
    serviceProviderListError,
    createServiceProvider: createMutation.mutateAsync,
    updateServiceProvider: updateMutation.mutateAsync,
    changeServiceProviderStatus,
    deleteServiceProvider,
    isCreatingServiceProvider: createMutation.isPending,
    isUpdatingServiceProvider: updateMutation.isPending,
    isChangingStatus: changeStatusMutation.isPending,
    isDeletingServiceProvider: deleteMutation.isPending,
  };
};
