import api from "../lib/axios";
import { normalizeApiError } from "../lib/apiError";

interface GetAllShipmentParams {
  search?: string;
  ordering?: string;
  page?: number;
  limit?: number;
  package_type?: string | null;
  shipment_status?: string;
}

export interface Shipment {
  id: number;
  tracking_id: string;
  merchant_name: string;
  customer_name: string;
  customer_phone: string;
  shipment_status: string;
  package_type: string;
  total_amount: string;
  created_at: string;
  updated_at: string;
}

interface ShipmentGetResponse {
  success: boolean;
  statusCode: number;
  data: {
    items: Shipment[];
  };
  total: number;
  page: number;
  message: string;
  limit: number;
  hasMore: boolean;
}

interface ShipmentUpdateResponse {
  success: boolean;
  statusCode: number;
  data: Shipment;
  message: string;
}

export const ShipmentService = {
  // ✅ List all shipments
  getAllShipments: async (params?: GetAllShipmentParams): Promise<ShipmentGetResponse> => {
    try {
      const { data } = await api.get("/packages/", { params });
      return data;
    } catch (error) {
      return normalizeApiError(error);
    }
  },

  // ✅ Delivered shipments
  getDeliveredShipments: async (id?: number): Promise<ShipmentGetResponse> => {
    try {
      const { data } = await api.get(id ? `/packages/delivered/${id}/` : "/packages/delivered/");
      return data;
    } catch (error) {
      return normalizeApiError(error);
    }
  },

  // ✅ Incoming shipments
  getIncomingShipments: async (id?: number): Promise<ShipmentGetResponse> => {
    try {
      const { data } = await api.get(id ? `/packages/incoming/${id}/` : "/packages/incoming/");
      return data;
    } catch (error) {
      return normalizeApiError(error);
    }
  },

  // ✅ Outgoing shipments
  getOutgoingShipments: async (id?: number): Promise<ShipmentGetResponse> => {
    try {
      const { data } = await api.get(id ? `/packages/outgoing/${id}/` : "/packages/outgoing/");
      return data;
    } catch (error) {
      return normalizeApiError(error);
    }
  },

  // ✅ Get single package details
  getShipmentDetails: async (id: number): Promise<ShipmentGetResponse> => {
    try {
      const { data } = await api.get(`/packages/${id}/`);
      return data;
    } catch (error) {
      return normalizeApiError(error);
    }
  },

  // ✅ Create a new package
  createShipment: async (payload: Partial<Shipment>): Promise<ShipmentUpdateResponse> => {
    try {
      const { data } = await api.post("/packages/create/", payload);
      return data;
    } catch (error) {
      return normalizeApiError(error);
    }
  },

  // ✅ Create a return package
  createReturnShipment: async (payload: Partial<Shipment>): Promise<ShipmentUpdateResponse> => {
    try {
      const { data } = await api.post("/packages/return/", payload);
      return data;
    } catch (error) {
      return normalizeApiError(error);
    }
  },

  // ✅ Create a send package
  createSendShipment: async (payload: Partial<Shipment>): Promise<ShipmentUpdateResponse> => {
    try {
      const { data } = await api.post("/packages/send/", payload);
      return data;
    } catch (error) {
      return normalizeApiError(error);
    }
  },

  // ✅ Update shipment (partial update)
  updateShipment: async (id: number, payload: Partial<Shipment>): Promise<ShipmentUpdateResponse> => {
    try {
      const { data } = await api.patch(`/packages/${id}/update/`, payload);
      return data;
    } catch (error) {
      return normalizeApiError(error);
    }
  },

  // ✅ Change shipment type or status
  changeShipmentStatus: async (id: number, payload: Partial<Shipment>): Promise<ShipmentUpdateResponse> => {
    try {
      const { data } = await api.patch(`/packages/${id}/change-status/`, payload);
      return data;
    } catch (error) {
      return normalizeApiError(error);
    }
  },

  // ✅ Delete shipment
  deleteShipment: async (id: number): Promise<ShipmentUpdateResponse> => {
    try {
      const { data } = await api.delete(`/packages/${id}/delete/`);
      return data;
    } catch (error) {
      return normalizeApiError(error);
    }
  },
};
