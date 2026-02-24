import api from "../lib/axios";
import { normalizeApiError } from "../lib/apiError";

/* ============================
   TYPES
============================ */

interface LocationBase {
  id: string;
  name: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

interface City extends LocationBase {}

interface Area extends LocationBase {
  city: string; // city id
}

interface CrudResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

/* ============================
   SERVICE
============================ */

export const LocationService = {
  /* ================= CITY ================= */

  createCity: async (
    payload: Partial<City>
  ): Promise<CrudResponse<City>> => {
    try {
      const { data } = await api.post("/locations/city/create", payload);
      return data;
    } catch (error) {
      normalizeApiError(error);
      throw error;
    }
  },

  getSingleCity: async (
    id: string
  ): Promise<CrudResponse<City>> => {
    try {
      const { data } = await api.get(`/locations/city/${id}`);
      return data;
    } catch (error) {
      normalizeApiError(error);
      throw error;
    }
  },

// location.service.ts
getAllCities: async (): Promise<any> => {
  try {
    const { data } = await api.get("/locations/city");
    return data;
  } catch (error) {
    normalizeApiError(error);
    throw error;
  }
},




  updateCity: async (
    id: string,
    payload: Partial<City>
  ): Promise<CrudResponse<City>> => {
    try {
      const { data } = await api.patch(
        `/locations/city/${id}/update`,
        payload
      );
      return data;
    } catch (error) {
      normalizeApiError(error);
      throw error;
    }
  },

  deleteCity: async (
    id: string
  ): Promise<CrudResponse<City>> => {
    try {
      const { data } = await api.delete(
        `/locations/city/${id}/delete`
      );
      return data;
    } catch (error) {
      normalizeApiError(error);
      throw error;
    }
  },

  /* ================= AREA ================= */

  createArea: async (
    payload: Partial<Area>
  ): Promise<CrudResponse<Area>> => {
    try {
      const { data } = await api.post("/locations/area/create", payload);
      return data;
    } catch (error) {
      normalizeApiError(error);
      throw error;
    }
  },

  getSingleArea: async (
    id: string
  ): Promise<CrudResponse<Area>> => {
    try {
      const { data } = await api.get(`/locations/area/${id}`);
      return data;
    } catch (error) {
      normalizeApiError(error);
      throw error;
    }
  },

  updateArea: async (
    id: string,
    payload: Partial<Area>
  ): Promise<CrudResponse<Area>> => {
    try {
      const { data } = await api.patch(
        `/locations/area/${id}/update`,
        payload
      );
      return data;
    } catch (error) {
      normalizeApiError(error);
      throw error;
    }
  },

  deleteArea: async (
    id: string
  ): Promise<CrudResponse<Area>> => {
    try {
      const { data } = await api.delete(
        `/locations/area/${id}/delete`
      );
      return data;
    } catch (error) {
      normalizeApiError(error);
      throw error;
    }
  },
};