import api from "../lib/axios";
import { normalizeApiError } from "../lib/apiError";
interface QueryParams{
    search:string;
    is_active:boolean;
    page:number;
    limit:number
}
interface DriverCreatePayload{
    image:string;
    driver_name:string;
    phone_number:string;
    email:string;
    is_active:boolean;
}
interface Driver{
    id:string;
    image:string;
    driver_name:string;
    phone_number:string;
    email:string;
    is_active:boolean;
    total_deliveries?:string;
    success_rate?:string;
}
interface DriverListResponse{
    success:boolean;
    statusCode:number;
    data:{
        items:Driver[]
    };
    total:number;
    page:number;
    message:string;
    limit:number;
    hasMore:boolean;
}
export const DriverService={
    getAll:async(
     params:QueryParams
    ):Promise<DriverListResponse | undefined>=>{
        try{
         const {data}=await api.get("/drivers/", { params })
         return data
        }catch(error){
         normalizeApiError(error)
         return undefined
        }
    },
    create:async(
        payload:DriverCreatePayload
    ):Promise<DriverListResponse | undefined>=>{
        try{
            const {data}=await api.post("/driver/create",payload)
            return data
        }catch(error){
            normalizeApiError(error)
            return undefined
        }
    },
   getSingle:async(
    id:string
   ):Promise<DriverListResponse | undefined>=>{
    try{
        const {data}=await api.get(`/driver/${id}`)
        return data

    }catch(error){
    normalizeApiError(error)
    return undefined
    }
   },
   changeStatus:async(
    id:string,
    payload:{
        is_active:boolean
    }
   ):Promise<DriverListResponse | undefined>=>{
    try{
    const {data}=await api.patch(`/driver/${id}/change-status`,payload)
    return data

    }catch(error){
    normalizeApiError(error)
    return undefined
    }
   },
   deleteDriver:async(
    id:string

   ):Promise<DriverListResponse | undefined>=>{
    try{
    const {data}=await api.delete(`/driver/${id}/delete`)
    return data

    }catch(error){
     normalizeApiError(error)
     return undefined
    }
   },
   update:async(
    id:string,
    payload:Driver | Partial<Driver>
   ):Promise<DriverListResponse | undefined>=>{
    try{
     const {data}=await api.patch(`/driver/${id}/update`,payload)
     return data

    }catch(error){
    normalizeApiError(error)
    return undefined
    }
   }


}
