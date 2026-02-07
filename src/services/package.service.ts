import api from "../lib/axios";
import { normalizeApiError } from "../lib/apiError";

export const PackageService = {
    getSinglePackage : async (
        id:string,
    ) :Promise<any> =>{
        try{
            const {data} = await api.patch(`/api/packages/${id}/`);
            return data;
        }catch(error){
            normalizeApiError(error)
        }
    },
      packageChangeStatus : async (
        id:string,
        payload:{
            is_active:boolean;
        }

    ) :Promise<any> =>{
        try{
            const {data} = await api.patch(`/api/packages/${id}/change-status/`, payload);
            return data;
        }catch(error){
            normalizeApiError(error)
        }
    },
    deletePackage : async (
        id:string
    ) : Promise<any> =>{
        try{
            const {data} = await api.delete(`/api/packages/${id}/delete`);
            return data
        }catch(error){
            normalizeApiError(error)
        }
    }
}