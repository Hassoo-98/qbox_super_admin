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
export const HomeownerService = {
    getallhomeowners: async (
        params:GetAllHomeownersParams
    ) : Promise<any> =>{
        try{
        const {data} = await api.get("/home_owner/", {params});
        return data
        }catch(error){
            normalizeApiError(error)
        }
    },
    changeHomeownerStatus : async(
        id:string,
        payload:{
            is_active:boolean
        }
    ): Promise<any>=>{
        try{
        const {data} = await api.patch(`/home_owner/${id}/status`, payload);
        return data
        }catch(error){
            normalizeApiError(error)
        }
    },
    deleteHomeowner : async(
        id:string
    ):Promise<any>=>{
        try{
            const {data} = await api.delete(`/home_owner/${id}/delete/`);
            return data;
        }catch(error){
            normalizeApiError(error)
        }
    }
}