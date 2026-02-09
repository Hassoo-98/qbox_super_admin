import api from "../lib/axios";
import { normalizeApiError } from "../lib/apiError";

interface PackageParams{
 search:string,
 ordering:string,
 page:number,
 limit:number
}

interface PackageDetails {
  id: number;
  package_type: string;
  package_size: string;
  package_weight: string;
  summary: string;
}

interface PackageItem {
  id: string;
  qbox: string;
  tracking_id: string;
  merchant_name: string;
  service_provider: string;
  driver_name: string;
  qr_code: string;
  package_status: string;
  shipment_status: string;
  last_update: string;   
  created_at: string; 
  details: PackageDetails;
}

interface PackagesData {
  items: PackageItem[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

interface GetAllPackagesResponse {
  success: boolean;
  statusCode: number;
  data: PackagesData;
  message: string;
}
interface CrudPackageResponse {
  success: boolean;
  statusCode: number;
  data: PackageItem;
  message: string;
}

export const PackageService = {
    getAllPackages : async (
        params:PackageParams
    ) : Promise<GetAllPackagesResponse> => {
        try{
            const {data} = await api.get("/api/packages/", {params});
            return data;
        }catch(error){
            normalizeApiError(error);
            throw error;
        }
    },
    getSinglePackage : async (
        id:string,
    ) :Promise<CrudPackageResponse> => {
        try{
            const {data} = await api.patch(`/api/packages/${id}/`);
            return data;
        }catch(error){
            normalizeApiError(error);
            throw error;
        }
    },
      packageChangeStatus : async (
        id:string,
        payload:{
            is_active:boolean;
        }

    ) :Promise<CrudPackageResponse> =>{
        try{
            const {data} = await api.patch(`/api/packages/${id}/status/`, payload);
            return data;
        }catch(error){
            normalizeApiError(error);
            throw error;
        }
    },
    deletePackage : async (
        id:string
    ) : Promise<CrudPackageResponse> =>{
        try{
            const {data} = await api.delete(`/api/packages/${id}/delete`);
            return data
        }catch(error){
            normalizeApiError(error);
            throw error;
        }
    }
}