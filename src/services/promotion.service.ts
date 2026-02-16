import api from "../lib/axios";
import { normalizeApiError } from "../lib/apiError";
import type { CrudPromotionResponse, GetAllPromotionResponse, PromotionItem, PromotionParams } from "../types/AllQboxTypes";

export const PromotionService = {
    creatPromotion : async(
        payload:PromotionItem
    ): Promise<CrudPromotionResponse> =>{
        try{
            const {data} = await api.post("/promotion/", payload);
            return data;
        }catch(error){
            normalizeApiError(error);
            throw error;
        }
    },
    updatePromotion : async (
        id: string,
        payload: PromotionItem | Partial<PromotionItem>,
    ) : Promise<CrudPromotionResponse> =>{
        try{
            const {data} = await api.put(`/promotion/${id}/`, payload);
            return data;
        }catch(error){
            normalizeApiError(error);
            throw error;
        }
    },
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
            const {data} = await api.patch(`/promotion/${id}/status/`, payload);
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
            const {data} = await api.delete(`/promotion/${id}/`);
            return data;
        }catch(error){
            normalizeApiError(error);
            throw error;
        }
    }

}