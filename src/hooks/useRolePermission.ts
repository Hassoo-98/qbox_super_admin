import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { RolesService, Role } from "../services/roles.service";
import { RolesService } from "../services/role.service";

interface GetAllRolesParams {
  search?: string;
  is_active?: string;
  page?: number;
  limit?: number;
}

export const useRoles = (params?: GetAllRolesParams) => {
  const queryClient = useQueryClient();

  const {
    data: roleList,
    isLoading: isLoadingRoleList,
    error: roleListError,
  } = useQuery({
    queryKey: ["roles", params],
    queryFn: () => RolesService.getAllRoles(params || {}),
  });

  const createMutation = useMutation({
    mutationFn: (payload: Partial<Role>) =>
      RolesService.createRole(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ uuid, payload }: { uuid: string; payload: Partial<Role> }) =>
      RolesService.updateRole(uuid, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });

  const changeStatusMutation = useMutation({
    mutationFn: ({ uuid, is_active }: { uuid: string; is_active: boolean }) =>
      RolesService.changeRoleStatus(uuid, { is_active }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (uuid: string) => RolesService.deleteRole(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });

  return {
    roleList,
    isLoadingRoleList,
    roleListError,

    createRole: createMutation.mutateAsync,
    updateRole: updateMutation.mutateAsync,
    changeRoleStatus: changeStatusMutation.mutateAsync,
    deleteRole: deleteMutation.mutateAsync,

    isCreatingRole: createMutation.isPending,
    isUpdatingRole: updateMutation.isPending,
    isChangingStatus: changeStatusMutation.isPending,
    isDeletingRole: deleteMutation.isPending,
  };
};
