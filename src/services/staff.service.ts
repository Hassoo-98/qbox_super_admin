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
interface StaffCreatePayload{
    name:string,
    phone_number:string,
    email:string,
    role:string,
    password:string,
    is_active:boolean
}
interface Staff{
    id:string,
    name:string,
    phone_number:string,
    email:string,
    role:string,
    password?:string,
    is_active:boolean,
    is_staff:boolean
}
interface StaffGetResponse{
    success:boolean;
    statusCode:number;
    data:{
        items:Staff[]
    },
    total:number;
    page:number;
    message:string;
    limit:number;
    hasMore:boolean;
}
interface StaffUpdateDeleteResponse{
    success:boolean;
    statusCode:number;
    data:Staff;
    message:string;
}
export const StaffService = {
    getAllStaff : async (
        params:GetAllStaffParams
    ) : Promise<StaffGetResponse> =>{
        try{
            const {data} = await api.get("/staff/", {params});
            return data;
        }catch(error){
            return normalizeApiError(error);
        }
    },
    createStaff : async(
        payload:StaffCreatePayload
    ):Promise<StaffUpdateDeleteResponse> =>{
        try{
            const {data} = await api.post("/staff/create/",payload);
            return data;
        }catch(error){
            return normalizeApiError(error);
        }
    },
    getSingleStaff : async(
        id:string,
    ):Promise<StaffGetResponse> =>{
        try{
            const {data} = await api.get(`/staff/${id}`)
            return data;
        }catch(error){
            return normalizeApiError(error);
        }
    },
    ChangeStatusStaff : async(
        id:string,
        payload:{
            is_active:boolean
        }
    ):Promise<StaffUpdateDeleteResponse> =>{
        try{
            const {data} = await api.patch(`/staff/${id}/change-status`, payload);
            return data;
        }catch(error){
            return normalizeApiError(error);
        }
    },
    DeleteStaff : async(
        id:string
    ): Promise<StaffUpdateDeleteResponse>=>{
        try{
            const {data} = await api.delete(`staff/${id}/delete`)
            return data;
        }catch(error){
            return normalizeApiError(error)
        }
    },
    UpdateStaff: async(
        id:string,
        payload:Staff | Partial<Staff>
    ): Promise<StaffUpdateDeleteResponse> =>{
        try{
            const {data} = await api.patch(`/staff/${id}`, payload);
            return data;
        }catch(error){
            return normalizeApiError(error);
        }
    }
}
