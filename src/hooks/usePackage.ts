import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PackageService } from "../services/package.service";
import type { PackageParams } from "../types/AllQboxTypes";
import { useParams } from "react-router-dom";
 
export const usePackage = (params: PackageParams) => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
 
  // 🔹 Get All Packages (NO CACHE)
  const {
    data: packageList,
    isLoading: isLoadingpackageList,
    error: packageListError,
  } = useQuery({
    queryKey: ["packages"],
    queryFn: () => PackageService.getAllPackages(params),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
 
  // 🔹 Get Single Package (NO CACHE)
  const { data: singlePackage } = useQuery({
    queryKey: ["single-package", id],
    queryFn: () => PackageService.getSinglePackage(id as string),
    enabled: !!id,
    staleTime: 0,
    gcTime: 0,
  });
 
  // 🔹 Change Status
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
 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
      queryClient.invalidateQueries({ queryKey: ["single-package"] });
    },
  });
 
  // 🔹 Delete Package
  const deleteMutation = useMutation({
    mutationFn: (id: string) => PackageService.deletePackage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
  });
 
  return {
    packageList,
    singlePackage,
 
    changePackageStatus: changeStatusMutation.mutate,
    deletePackage: deleteMutation.mutate,
 
    isLoadingpackageList,
    isChangingStatus: changeStatusMutation.isPending,
    isDeletingPackage: deleteMutation.isPending,
 
    packageListError,
    changeStatusError: changeStatusMutation.error,
    deletePackageError: deleteMutation.error,
  };
};