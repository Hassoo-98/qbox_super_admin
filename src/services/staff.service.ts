import api from "../lib/axios";
import { normalizeApiError } from "../lib/apiError";

interface GetAllStaffParams{
    search:string,
    ordering:string,
    role:string,
    is_active:string,
    page:number,
    limit:number
}

interface Staff {
  id: string;
  name: string;
  phone_number: string;
  email: string;
  role: "agent" | "admin" | "staff";
  is_active: boolean;
  is_staff: boolean;
  date_joined: string;
  last_login: string | null;
}

interface StaffListData {
  items: Staff[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
};
interface GetStaffListResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: StaffListData;
}

interface CrudStaffResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Staff;
}

export const StaffService = {
    getAllStaff : async (
        params:GetAllStaffParams
    ) : Promise<GetStaffListResponse> =>{
        try{
            const {data} = await api.get("/staff/", {params});
            return data;
        }catch(error){
            normalizeApiError(error);
            throw error;
        }
    },
    createStaff : async(
        payload:Staff
    ):Promise<CrudStaffResponse> =>{
        try{
            const {data} = await api.post("/staff/create/",payload);
            return data;
        }catch(error){
            normalizeApiError(error);
            throw error;
        }
    },
    getSingleStaff : async(
        id:string,
    ):Promise<CrudStaffResponse> =>{
        try{
            const {data} = await api.get(`/staff/${id}`)
            return data;
        }catch(error){
            normalizeApiError(error);
            throw error;
        }
    },
    ChangeStatusStaff : async(
        id:string,
        payload:{
            is_active:boolean
        }
    ):Promise<CrudStaffResponse> =>{
        try{
            const {data} = await api.patch(`/staff/${id}/change-status`, payload);
            return data;
        }catch(error){
            normalizeApiError(error);
            throw error;
        }
    },
    DeleteStaff : async(
        id:string
    ): Promise<CrudStaffResponse> =>{
        try{
            const {data} = await api.delete(`staff/${id}/delete`)
            return data;
        }catch(error){
            normalizeApiError(error);
            throw error;
        }
    },
    UpdateStaff: async(
        id:string,
        payload:Staff | Partial<Staff>
    ): Promise<CrudStaffResponse> =>{
        try{
            const {data} = await api.patch(`/staff/${id}/update`, payload);
            return data;
        }catch(error){
            normalizeApiError(error);
            throw error;
        }
    }
}