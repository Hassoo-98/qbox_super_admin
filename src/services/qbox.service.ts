import api from "../lib/axios";
import { normalizeApiError } from "../lib/apiError";
import type { GetAllQboxResponse, QboxParams, CrudQboxResponse } from "../types/AllQboxTypes";

export const qboxServices = {
    getAllQbox : async (
        params:QboxParams
    ) : Promise<GetAllQboxResponse> =>{
        try {
            const {data} = await api.get('/qbox/', {params});
            return data;
        }catch(error){
            normalizeApiError(error);
            throw error;
        }
    },
    getSingleQbox : async (
        id:string,
    ) : Promise<CrudQboxResponse> =>{
        try{
            const {data} = await api.get(`/qbox/${id}`);
            return data;
        }catch(error){
            normalizeApiError(error);
            throw error;
        }
    },
    DeleteQbox: async (
        id:string,
    ) : Promise<CrudQboxResponse> => {
        try{
            const {data} = await api.delete(`/qbox/${id}/delete`);
            return data;
        }catch(error){
        normalizeApiError(error);
        throw error;
        }
    }
}