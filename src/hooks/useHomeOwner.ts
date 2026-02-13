import { useQuery, useMutation } from "@tanstack/react-query";
import { HomeownerService } from "../services/homeOwner.service";
import { useParams } from "react-router-dom";
interface GetAllHomeownersParams {
    search: string,
    is_active: string,
    is_verified: string,
    ordering: string,
    page: number,
    limit: number
}
export const useHomeowner = (params?: GetAllHomeownersParams) => {
   const { id } = useParams<{ id: string }>();
    const { data: HomeownerList, isLoading: isLoadingHomeownerList, error: HomeonwerListError, refetch:RefetchHomeownerList} = useQuery({
        queryKey: ["homeonwer", params],
        queryFn: () => HomeownerService.getallhomeowners(params as GetAllHomeownersParams),
    })
    const { data: Homeowner, isLoading: isLoadingHomeowner, error: HomeonwerError } = useQuery({
        queryKey: ["single-homeowner", id],
        queryFn: () => HomeownerService.getSingleHomeowner(id as string),
        enabled: !!id,
    })
    const changeStatusMutation = useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: { is_active: boolean } }) =>
            HomeownerService.changeHomeownerStatus(id, payload),
    });

    // Delete Homeowner mutation
    const deleteMutation = useMutation({
        mutationFn: (id: string) => HomeownerService.deleteHomeowner(id),
    });
    return {
        HomeownerList,
        isLoadingHomeownerList,
        HomeonwerListError,
        RefetchHomeownerList,
        Homeowner,
        isLoadingHomeowner,
        HomeonwerError,
        homeOwnerChangeStatus: changeStatusMutation.mutate,
        isHomeOwnerChangingStatus: changeStatusMutation.isPending,
        HomeOwnerError: changeStatusMutation.error,
        deleteHomeowner: deleteMutation.mutate
    }
}
