import api from "../lib/axios";
import { normalizeApiError } from "../lib/apiError";

interface GetAllHomeownersParams{
    search:string,
    is_active:string,
    is_verified:string,
    ordering:string,
    page:number,
    limit:number
}

interface Address {
  short_address: string;
  city: string;
  district: string;
  street: string;
  postal_code: string;
  building_number: string;
  secondary_building_number: string | null;
}

interface QBox {
  id: string;
  qbox_id: string;
  homeowner_name_snapshot: string;
  short_address_snapshot: string;
  city_snapshot: string;
  status: string;
  led_indicator: string;
  camera_status: string;
  last_online: string | null;
  activation_date: string;
  qbox_image: string;
}

interface HomeOwner {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  secondary_phone_number: string | null;
  is_verified: boolean;
  email_verified: boolean;
  phone_verified: boolean;
  address: Address;
  installation_location_preference: string;
  installation_access_instruction: string;
  installation_qbox_image_url: string;
  is_active: boolean;
  date_joined: string;
  qboxes: QBox[];
}

interface HomeOwnersData {
  items: HomeOwner[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
interface GetAllHomeOwnersResponse {
  success: boolean;
  statusCode: number;
  data: HomeOwnersData;
  message: string;
}

interface GetSingleOrDeleteOrStatusResponse {
  success: boolean;
  statusCode: number;
  data: HomeOwner;
  message: string;
}

export const HomeownerService = {
    getallhomeowners: async (
        params:GetAllHomeownersParams
    ) : Promise<GetAllHomeOwnersResponse> =>{
        try{
        const {data} = await api.get("/home_owner/", {params});
        return data
        }catch(error){
            normalizeApiError(error);
            throw error;
        }
    },
    getSingleHomeowner: async (
        id:string,
    ):Promise<GetSingleOrDeleteOrStatusResponse> => {
        try{
        const {data} = await api.get(`/home_owner/${id}`);
        return data;
        }catch(error){
            normalizeApiError(error);
            throw error;
        }
    },
    changeHomeownerStatus : async(
        id:string,
        payload:{
            is_active:boolean
        }
    ): Promise<GetSingleOrDeleteOrStatusResponse>=>{
        try{
        const {data} = await api.patch(`/home_owner/${id}/status`, payload);
        return data
        }catch(error){
            normalizeApiError(error);
            throw error;
        }
    },
    deleteHomeowner : async(
        id:string
    ):Promise<GetSingleOrDeleteOrStatusResponse>=>{
        try{
            const {data} = await api.delete(`/home_owner/${id}/delete/`);
            return data;
        }catch(error){
            normalizeApiError(error);
            throw error;
        }
    }
}