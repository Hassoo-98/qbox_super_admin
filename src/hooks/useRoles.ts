import { useQuery, useMutation} from "@tanstack/react-query";
import type { RoleItem, RoleParams, ChangeStatusParams } from "../types/AllQboxTypes";
import { RoleService } from "../services/role.service";
export const useRole = (params?: RoleParams) =>{

    const {data:RoleList, isLoading:isLoadingRoleList, isError:ErrorRoleList} = useQuery({
        queryKey:['Roles'],
        queryFn:()=> RoleService.getAllRoles(params as RoleParams),
    });;

    const changeStatusMutation = useMutation({
        mutationFn:({id, payload}: ChangeStatusParams) => RoleService.changeRoleStatus(id, payload),
    })
    const deleteMutation = useMutation({
        mutationFn:(id: string) => RoleService.deleteRole(id),
    })
    return{
        // All Roles 
        RoleList,
        isLoadingRoleList,
        ErrorRoleList,

        // Change Status 
        roleChangeStatus:changeStatusMutation.mutate,
        isRoleChangingStatus:changeStatusMutation.isPending,
        roleChangeStatusError:changeStatusMutation.isError,
        deleteRole:deleteMutation.mutate,
    }
}