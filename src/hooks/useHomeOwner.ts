import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { HomeownerService } from "../services/homeOwner.service";
import { useParams } from "react-router-dom";
import type { GetAllHomeownersParams } from "../types/AllQboxTypes";

interface UseHomeownerOptions {
  fetchSingle?: boolean; // sirf single homeowner get karna hai ya nahi
  fetchList?: boolean;   // sirf list get karna hai ya nahi
}

export const useHomeowner = (
  params?: GetAllHomeownersParams,
  options?: UseHomeownerOptions
) => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { fetchSingle = true, fetchList = true } = options || {};

  // ===============================
  // 🔹 GET ALL HOMEOWNERS
  // ===============================
  const {
    data: homeownerList,
    isLoading: isLoadingHomeownerList,
    error: homeownerListError,
  } = useQuery({
    queryKey: ["homeowner", params],
    queryFn: () =>
      HomeownerService.getAllHomeowners(params as GetAllHomeownersParams),
    enabled: fetchList,
  });

  // ===============================
  // 🔹 GET SINGLE HOMEOWNER
  // ===============================
  const {
    data: homeowner,
    isLoading: isLoadingHomeowner,
    error: homeownerError,
  } = useQuery({
    queryKey: ["single-homeowner", id],
    queryFn: () => HomeownerService.getSingleHomeowner(id as string),
    enabled: !!id && fetchSingle,
  });

  // ===============================
  // 🔹 CHANGE STATUS
  // ===============================
  const changeStatusMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: { is_active: boolean };
    }) => HomeownerService.changeHomeownerStatus(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["homeowner"] });
      queryClient.invalidateQueries({ queryKey: ["single-homeowner"] });
    },
  });

  // ===============================
  // 🔹 DELETE HOMEOWNER
  // ===============================
  const deleteMutation = useMutation({
    mutationFn: (id: string) => HomeownerService.deleteHomeowner(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["homeowner"] });
    },
  });

  return {
    // list
    homeownerList,
    isLoadingHomeownerList,
    homeownerListError,

    // single
    homeowner,
    isLoadingHomeowner,
    homeownerError,

    // status
    changeHomeownerStatus: changeStatusMutation.mutate,
    isChangingHomeownerStatus: changeStatusMutation.isPending,
    changeHomeownerStatusError: changeStatusMutation.error,

    // delete
    deleteHomeowner: deleteMutation.mutate,
    isDeletingHomeowner: deleteMutation.isPending,
    deleteHomeownerError: deleteMutation.error,
  };
};