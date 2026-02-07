import { useMutation } from "@tanstack/react-query";
import { PackageService } from "../services/package.service";

export const usePackage = () => {
  const getSinglePackageMutation = useMutation({
    mutationFn: (id: string) => PackageService.getSinglePackage(id),
  });
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
    getPackage: getSinglePackageMutation.mutate,
    changePackageStatus: changeStatusMutation.mutate,
    deletePackage: deleteMutation.mutate,

    // loading states
    isGettingPackage: getSinglePackageMutation.isPending,
    isChangingStatus: changeStatusMutation.isPending,
    isDeletingPackage: deleteMutation.isPending,

    // errors
    getPackageError: getSinglePackageMutation.error,
    changeStatusError: changeStatusMutation.error,
    deletePackageError: deleteMutation.error,
  };
};
