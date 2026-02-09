import api from "../lib/axios";
import { normalizeApiError } from "../lib/apiError";
interface QueryParams {
    search: string;
    is_active: boolean;
    page: number;
    limit: number
}
interface Driver {
    id: string;
    image: string;
    driver_name: string;
    phone_number: string;
    email: string;
    is_active: boolean;
}

interface DriverListData {
    item: Driver[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
}

interface GetlistDriverResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: DriverListData;
}

interface CrudDriverResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: Driver;
}
export const DriverService = {
    getAllDriver: async (
        params: QueryParams
    ): Promise<GetlistDriverResponse> => {
        try {
            const { data } = await api.get("/drivers/", { params })
            return data
        } catch (error) {
            normalizeApiError(error);
            throw error;
        }
    },
    createDriver: async (
        payload: Driver
    ): Promise<CrudDriverResponse> => {
        try {
            const { data } = await api.post("/driver/create", payload)
            return data
        } catch (error) {
            normalizeApiError(error);
            throw error;
        }
    },
    getSingleDriver: async (
        id: string
    ): Promise<CrudDriverResponse> => {
        try {
            const { data } = await api.get(`/driver/${id}`)
            return data

        } catch (error) {
            normalizeApiError(error);
            throw error;
        }
    },
    changeDriverStatus: async (
        id: string,
        payload: {
            is_active: boolean
        }
    ): Promise<CrudDriverResponse> => {
        try {
            const { data } = await api.patch(`/driver/${id}/change-status`, payload)
            return data

        } catch (error) {
            normalizeApiError(error);
            throw error;
        }
    },
    deleteDriver: async (
        id: string

    ): Promise<CrudDriverResponse> => {
        try {
            const { data } = await api.delete(`/driver/${id}/delete`)
            return data

        } catch (error) {
            normalizeApiError(error);
            throw error;
        }
    },
    updateDriver: async (
        id: string,
        payload: Driver | Partial<Driver>
    ): Promise<CrudDriverResponse> => {
        try {
            const { data } = await api.patch(`/driver/${id}/update`, payload)
            return data

        } catch (error) {
            normalizeApiError(error);
            throw error;
        }
    }


}