import api from "../lib/axios";
import { normalizeApiError } from "../lib/apiError";
import type { CrudPromotionResponse, GetAllPromotionResponse, PromotionParams } from "../types/AllQboxTypes";

export const PromotionService = {
    getAllPromotion: async (
        params:PromotionParams
    ): Promise<GetAllPromotionResponse> => {
        try {
            const { data } = await api.get("/promotion/", {params});
            return data;
        } catch (error) {
            normalizeApiError(error);
            throw error;
        }
    },
    getSinglePromotion: async (
        id: string,
    ): Promise<CrudPromotionResponse> => {
        try {
            const { data } = await api.get(`/promotion/${id}`);
            return data;
        } catch (error) {
            normalizeApiError(error);
            throw error;
        }
    },
    promotionChangeStatus : async (
        id:string,
        payload:{
            is_active:boolean;
        }
    ) : Promise<CrudPromotionResponse> =>{
        try{
            const {data} = await api.patch(`/promotion/${id}/status`, payload);
            return data;
        }catch(error){
            normalizeApiError(error);
            throw error;
        }
    },
    deletePromotion : async (
        id:string,
    ) : Promise<CrudPromotionResponse> =>{
        try{
            const {data} = await api.delete(`/promotion/${id}`);
            return data;
        }catch(error){
            normalizeApiError(error);
            throw error;
        }
    }

}