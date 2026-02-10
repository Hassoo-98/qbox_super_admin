import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { HomeownerService } from "../services/homeOwner.service";
interface GetAllHomeownersParams{
    search:string,
    is_active:string,
    is_verified:string,
    ordering:string,
    page:number,
    limit:number
}
export const  useHomeowner = (params?: GetAllHomeownersParams) =>{
const queryClient = useQueryClient();

const {data:HomeonwerList, isLoading:isLoadingHomeonwerList, error:HomeonwerError} = useQuery({
    queryKey: ["homeonwer", params],
    queryFn:() => HomeownerService.getallhomeowners(params as GetAllHomeownersParams),
})
const changeStatusMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: { is_active: boolean } }) =>
        HomeownerService.changeHomeownerStatus(id, payload),
});
return{
    HomeonwerList,
    isLoadingHomeonwerList,
    HomeonwerError,
    homeOwnerChangeStatus: changeStatusMutation.mutate,
    isHomeOwnerChangingStatus: changeStatusMutation.isPending,
    HomeOwnerError: changeStatusMutation.error
}
}
