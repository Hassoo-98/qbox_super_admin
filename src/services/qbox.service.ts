import api from "../lib/axios";
import { normalizeApiError } from "../lib/apiError";
import type { GetAllQboxResponse, QboxParams } from "../types/AllQboxTypes";

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

    }
}