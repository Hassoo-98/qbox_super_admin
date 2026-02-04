import api from "../lib/axios";
import { normalizeApiError } from "../lib/apiError";
interface QueryParams{
    search:string;
    is_active:boolean;
    page:number;
    limit:number
}
interface Driver{
    id:string;
    image:string;
    driver_name:string;
    phone_number:string;
    email:string;
    is_active:boolean;
    total_deliveries:string;
    success_rate:string;
}
export const DriverService={
    getAll:async(
     params:QueryParams
    ):Promise<any>=>{
        try{
         const {data}=await api.get("/drivers/", { params })
         return data
        }catch(error){
         normalizeApiError(error)
        }
    },
    create:async(
        payload:Driver
    ):Promise<any>=>{
        try{
            const {data}=await api.post("/driver/create",payload)
            return data
        }catch(error){
            normalizeApiError(error)
        }
    },
   getSingle:async(
    id:string
   ):Promise<any>=>{
    try{
        const {data}=await api.get(`/driver/${id}`)
        return data

    }catch(error){
    normalizeApiError(error)
    }
   },
   changeStatus:async(
    id:string,
    payload:{
        is_active:boolean
    }
   ):Promise<any>=>{
    try{
    const {data}=await api.patch(`/driver/${id}/change-status`,payload)
    return data

    }catch(error){
    normalizeApiError(error)
    }
   },
   deleteDriver:async(
    id:string

   ):Promise<any>=>{
    try{
    const {data}=await api.delete(`/driver/${id}/delete`)
    return data

    }catch(error){
     normalizeApiError(error)
    }
   },
   update:async(
    id:string,
    payload:Driver | Partial<Driver>
   ):Promise<any>=>{
    try{
     const {data}=await api.patch(`/driver/${id}/update`,payload)
     return data

    }catch(error){
    normalizeApiError(error)
    }
   }


}
