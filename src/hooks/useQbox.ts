import { useQuery } from "@tanstack/react-query";
import { qboxServices } from "../services/qbox.service";
import type { QboxParams } from "../types/AllQboxTypes";
export const useQbox =(params?: QboxParams) =>{
const {data:QboxList, isLoading:isLoadingQboxList, error:QboxError} = useQuery({
    queryKey:["qbox", params],
    queryFn:() => qboxServices.getAllQbox(params as QboxParams)
})
return{
    QboxList,
    isLoadingQboxList,
    QboxError
}
}