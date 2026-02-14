import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { ShipmentService } from "../services/shipment.service";
// import type { Shipment } from "../services/shipment.service";
import { ShipmentService } from "../services/allshippment.service";
import type { Shipment } from "../services/allshippment.service";

interface GetAllShipmentParams {
  search?: string;
  ordering?: string;
  package_type?: number | null;
  shipment_status?: string;
  page?: number;
  limit?: number;
}

export const useShipment = (params?: GetAllShipmentParams) => {
  const queryClient = useQueryClient();

  // ✅ Fetch Shipment List
  const {
    data: shipmentList,
    isLoading: isLoadingShipmentList,
    error: shipmentListError,
  } = useQuery({
    queryKey: ["shipments", params],
    queryFn: () =>
      ShipmentService.getAllShipments(
        params as GetAllShipmentParams
      ),
  });

  // ✅ Create Shipment
  const createMutation = useMutation({
    mutationFn: (payload: any) =>
      ShipmentService.createShipment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipments"] });
    },
  });

  // ✅ Update Shipment
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: any;
    }) => ShipmentService.updateShipment(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipments"] });
    },
  });

  // ✅ Change Shipment Status (Optimistic Update)
  const changeStatusMutation = useMutation({
    mutationFn: ({
      id,
      shipment_status,
    }: {
      id: number;
      shipment_status: string;
    }) =>
      ShipmentService.changeShipmentStatus(id, {
        shipment_status,
      }),

    onMutate: async ({
      id,
      shipment_status,
    }: {
      id: number;
      shipment_status: string;
    }) => {
      await queryClient.cancelQueries({
        queryKey: ["shipments", params],
      });

      const previous = queryClient.getQueryData<any>([
        "shipments",
        params,
      ]);

      queryClient.setQueryData(["shipments", params], (old: any) => {
        if (!old) return old;

        const items = Array.isArray(old.data?.items)
          ? old.data.items
          : [];

        const newItems = items.map((it: Shipment) =>
          it.id === id ? { ...it, shipment_status } : it
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
          ["shipments", params],
          context.previous
        );
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipments"] });
    },
  });

  // ✅ Delete Shipment
  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      ShipmentService.deleteShipment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipments"] });
    },
  });

  return {
    shipmentList,
    isLoadingShipmentList,
    shipmentListError,
    createShipment: createMutation.mutateAsync,
    updateShipment: updateMutation.mutateAsync,
    changeShipmentStatus: changeStatusMutation.mutateAsync,
    deleteShipment: deleteMutation.mutateAsync,
    isCreatingShipment: createMutation.isPending,
    isUpdatingShipment: updateMutation.isPending,
    isChangingShipmentStatus: changeStatusMutation.isPending,
    isDeletingShipment: deleteMutation.isPending,
  };
};
