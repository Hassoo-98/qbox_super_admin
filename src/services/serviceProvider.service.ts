import api from "../lib/axios";
import { normalizeApiError } from "../lib/apiError";

interface GetAllServiceProviderParams {
  search: string;
  ordering: string;
  city: string;
  is_active: string;
  page: number;
  limit: number;
}

interface ServiceProviderCreatePayload {
  name: string;
  phone_number: string;
  email: string;
  city: string; // FK id
  password: string;
  is_active: boolean;
}

export interface ServiceProvider {
  id: number;
  name: string;
  is_approved: boolean;
  business_registration_number: string;
  contact_person_name: string;
  phone_number: string;
  email: string;
  operating_cities: string[];
  settlement_cycle_days: number;
  markup_type: string;
  markup_value: string;
  first_kg_charge: string;
  additional_kg_charge: string;
  fuel_surcharge_percentage: string;
  fuel_surcharge_enabled: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface ServiceProviderGetResponse {
  success: boolean;
  statusCode: number;
  data: {
    items: ServiceProvider[];
  };
  total: number;
  page: number;
  message: string;
  limit: number;
  hasMore: boolean;
}

interface ServiceProviderUpdateDeleteResponse {
  success: boolean;
  statusCode: number;
  data: ServiceProvider;
  message: string;
}

export const ServiceProviderService = {
  getAllServiceProvider: async (
    params?: GetAllServiceProviderParams
  ): Promise<ServiceProviderGetResponse> => {
    try {
      // fetch list
      const { data } = await api.get("/service_provider/", { params });
      return data;
    } catch (error) {
      return normalizeApiError(error);
    }
  },

  createServiceProvider: async (
    payload: ServiceProviderCreatePayload
  ): Promise<ServiceProviderUpdateDeleteResponse> => {
    try {
      const { data } = await api.post("/service_provider/", payload);
      return data;
    } catch (error) {
      return normalizeApiError(error);
    }
  },

  getSingleServiceProvider: async (
    id: number
  ): Promise<ServiceProviderGetResponse> => {
    try {
      const { data } = await api.get(`/service_provider/${id}`);
      return data;
    } catch (error) {
      return normalizeApiError(error);
    }
  },

  changeStatusServiceProvider: async (
    id: number,
    payload: { is_approved: boolean }
  ): Promise<ServiceProviderUpdateDeleteResponse> => {
    try {
      const { data } = await api.patch(
        `/service_provider/${id}/approve`,
        payload
      );
      return data;
    } catch (error) {
      return normalizeApiError(error);
    }
  },

  deleteServiceProvider: async (id: number): Promise<ServiceProviderUpdateDeleteResponse> => {
    try {
      const { data } = await api.delete(`/service_provider/${id}/delete`);
      return data;
    } catch (error) {
      return normalizeApiError(error);
    }
  },

  updateServiceProvider: async (
    id: number,
    payload: ServiceProvider | Partial<ServiceProvider>
  ): Promise<ServiceProviderUpdateDeleteResponse> => {
    try {
      const { data } = await api.patch(`/service_provider/${id}`, payload);
      return data;
    } catch (error) {
      return normalizeApiError(error);
    }
  },
};
