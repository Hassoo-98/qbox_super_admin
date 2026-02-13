import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { ServiceProviderService } from "../services/serviceProvider";
// import type { ServiceProvider } from "../services/serviceProvider";
import { ServiceProviderService } from "../services/serviceProvider.service";
import type { ServiceProvider } from "../services/serviceProvider.service";

interface GetAllServiceProviderParams {
  search?: string;
  ordering?: string;
  city?: string;
  is_active?: string;
  page?: number;
  limit?: number;
}

export const useServiceProvider = (params?: GetAllServiceProviderParams) => {
  const queryClient = useQueryClient();

  // Fetch service provider list
  const {
    data: serviceProviderList,
    isLoading: isLoadingServiceProviderList,
    error: serviceProviderListError,
  } = useQuery({
    queryKey: ["service-provider", params],
    queryFn: () =>
      ServiceProviderService.getAllServiceProvider(
        params as GetAllServiceProviderParams
      ),
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
      await queryClient.cancelQueries({
        queryKey: ["service-provider", params],
      });

      const previous = queryClient.getQueryData<any>([
        "service-provider",
        params,
      ]);

      queryClient.setQueryData(["service-provider", params], (old: any) => {
        if (!old) return old;

        const items = Array.isArray(old.data?.items)
          ? old.data.items
          : [];

        const newItems = items.map((it: ServiceProvider) =>
          it.id === id ? { ...it, is_active } : it
        );

        return {
          ...old,
          data: { ...old.data, items: newItems },
        };
      });

      return { previous };
    },

    onError: (_err, _variables, context: any) => {
      if (context?.previous) {
        queryClient.setQueryData(
          ["service-provider", params],
          context.previous
        );
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

  return {
    serviceProviderList,
    isLoadingServiceProviderList,
    serviceProviderListError,
    createServiceProvider: createMutation.mutateAsync,
    updateServiceProvider: updateMutation.mutateAsync,
    changeServiceProviderStatus: changeStatusMutation.mutateAsync,
    deleteServiceProvider: deleteMutation.mutateAsync,
    isCreatingServiceProvider: createMutation.isPending,
    isUpdatingServiceProvider: updateMutation.isPending,
    isChangingStatus: changeStatusMutation.isPending,
    isDeletingServiceProvider: deleteMutation.isPending,
  };
};
