import api from "../lib/axios";
import { normalizeApiError } from "../lib/apiError";
import type { GetAllHomeownersParams, GetAllHomeOwnersResponse, GetSingleOrDeleteOrStatusResponse } from "../types/AllQboxTypes";


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