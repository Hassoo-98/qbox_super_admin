import api from "../lib/axios";
import { normalizeApiError } from "../lib/apiError";
import type { RoleParams, GetAllRoleResponse, CrudRoleResponse } from "../types/AllQboxTypes";
export const RoleService = {

    getAllRoles : async (
        params:RoleParams
    ) : Promise<GetAllRoleResponse> =>{
        try{
            const {data} = await api.get("/roles/", {params});
            return data;
        }catch(error){
            normalizeApiError(error);
            throw error;
        }
    },

    changeRoleStatus : async (
        id:string,
        payload:{
            is_active:boolean;
        }
    ) : Promise<CrudRoleResponse> =>{
        try{
            const {data} = await api.patch(`/roles/${id}/status`, payload);
            return data;
        }catch(error){
            normalizeApiError(error);
            throw error;
        }
    },
      deleteRole : async (
        id:string,
      ) : Promise<CrudRoleResponse> =>{
        try{
         const {data} = await api.delete(`/roles/${id}`);
         return data;
        }catch(error){
            normalizeApiError(error);
            throw error;
        }
    }
}