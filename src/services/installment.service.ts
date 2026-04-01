import api from "../lib/axios"
import { normalizeApiError } from "../lib/apiError"
import type { CrudQboxInstallmentnResponse, GetQboxInstallmentsResponse, InstallmentParams } from "../types/AllQboxTypes";
export const installmentService = {
    getAllInstallments : async (
        params:InstallmentParams
    ) : Promise <GetQboxInstallmentsResponse> =>{
        try{
            const {data} = await api.get("/qbox/installments/", {params});
            return data;
        }catch(error){
            normalizeApiError(error);
            throw error;
        }
    },

    getSingleInstallment : async (
        id: string
    ) : Promise<CrudQboxInstallmentnResponse> => {
        try{
            const{data} = await api.get(`/qbox/installments/${id}/detail`);
             return data
        }catch(error){
            normalizeApiError(error);
            throw error;
        }
    }
}