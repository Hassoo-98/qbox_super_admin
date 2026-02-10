import api from "../lib/axios";
import { normalizeApiError } from "../lib/apiError";
import type { CrudPackageResponse, GetAllPackagesResponse, PackageParams } from "../types/AllQboxTypes";



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