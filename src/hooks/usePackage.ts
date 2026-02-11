import { useMutation, useQuery } from "@tanstack/react-query";
import { PackageService } from "../services/package.service";
import type { PackageParams } from "../types/AllQboxTypes";
import { useParams } from "react-router-dom";
export const usePackage = (params: PackageParams) => {
  const {id} = useParams<{id:string}>();
  const { data: packageList, isLoading: isLoadingpackageList, error: packageListError } = useQuery({
    queryKey: ["packages", params],
    queryFn: () => PackageService.getAllPackages(params as PackageParams),
  })

  const {} = useQuery({
    queryKey:["single-package", id],
    queryFn:() => PackageService.getSinglePackage(id as string),
    enabled: !!id, 
  })

  const changeStatusMutation = useMutation({
    mutationFn: ({
      id,
      is_active,
    }: {
      id: string;
      is_active: boolean;
    }) =>
      PackageService.packageChangeStatus(id, {
        is_active,
      }),
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) => PackageService.deletePackage(id),
  });

  return {
    // actions
    packageList,
    changePackageStatus: changeStatusMutation.mutate,
    deletePackage: deleteMutation.mutate,

    // loading states
    isLoadingpackageList,
    isChangingStatus: changeStatusMutation.isPending,
    isDeletingPackage: deleteMutation.isPending,

    // errors
    packageListError,
    changeStatusError: changeStatusMutation.error,
    deletePackageError: deleteMutation.error,
  };
};
