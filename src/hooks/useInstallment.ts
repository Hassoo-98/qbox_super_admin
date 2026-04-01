import { useQuery } from "@tanstack/react-query";
import type { InstallmentParams } from "../types/AllQboxTypes";
import { installmentService } from "../services/installment.service";
import { useParams } from "react-router-dom";
export const useInstallment =  (params?: InstallmentParams) =>{
    const {id} = useParams<{id: string}>();
    const {data:installmentList, isLoading: isLoadinginstallmentList, isError: isErrorinstallmentList} = useQuery({
        queryKey:['installmentpending', params],
        queryFn: () => installmentService.getAllInstallments(params as InstallmentParams),
    })

    const {data:installmentView , isLoading: isLoadinginstallmentView, isError: isErrorinstallmentView} = useQuery({
        queryKey:["installmentpending", id],
        queryFn: () => installmentService.getSingleInstallment(id as string)
    })

return {
    installmentList,
    isLoadinginstallmentList,
    isErrorinstallmentList,
    installmentView,
    isLoadinginstallmentView,
    isErrorinstallmentView
}
}