import { useMutation, useQuery, } from "@tanstack/react-query"
import type { PromotionItem, PromotionParams } from "../types/AllQboxTypes"
import { PromotionService } from "../services/promotion.service"
import { useParams } from "react-router-dom"
export const usePromotion = (params?: PromotionParams) => {
    const { id } = useParams<{ id: string }>();

    const createMutation = useMutation({
        mutationFn:(payload:PromotionItem)=> PromotionService.creatPromotion(payload),
    })

    const updateMutation = useMutation({
        mutationFn:({id, payload}:{id:string,payload:PromotionItem})=> PromotionService.updatePromotion(id,payload),
    })
    const { data: promotionList, isLoading: isLoadingPromotion, isError: promotionListError } = useQuery({
        queryKey: ["promotion", params],
        queryFn: () => PromotionService.getAllPromotion(params as PromotionParams),
        staleTime: 0,
        gcTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    });

    const changeStatusMutation = useMutation({
        mutationFn: ({ id, payload }: { id: string, payload: { is_active: boolean } }) => PromotionService.promotionChangeStatus(id, payload)
    })

    const deleteMutation = useMutation({
        mutationFn: (id:string) => PromotionService.deletePromotion(id)
    })
    return {
        // all promotions 
        promotionList,
        isLoadingPromotion,
        promotionListError,

        // Change Status 
        promotionChangeStatus: changeStatusMutation.mutate,
        isPromotionChangingStatus: changeStatusMutation.isPending,
        promotionChangeStatusError:changeStatusMutation.isError,
        deletePromotion: deleteMutation.mutate,

        // Create & Update 
        createPromotion: createMutation.mutateAsync,
        updatePromotion: updateMutation.mutateAsync,

    }

}