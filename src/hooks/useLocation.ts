import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { LocationService } from "../services/location.service";

interface GetAllLocationParams {
  search?: string;
  ordering?: string;
  is_active?: string;
  page?: number;
  limit?: number;
}

export const useLocation = (params?: GetAllLocationParams) => {
  const queryClient = useQueryClient();

  /* ============================
     CITY LIST
  ============================ */

  const {
    data: cityList,
    isLoading: isLoadingCityList,
    error: cityListError,
  } = useQuery({
    queryKey: ["cities", params],
    queryFn: () =>
      LocationService.getAllCities?.(params as GetAllLocationParams),
    enabled: !!LocationService.getAllCities,
    keepPreviousData: true,
  });

  const invalidateCityList = () => {
    queryClient.invalidateQueries({
      queryKey: ["cities", params],
      exact: true,
    });
  };

  const createCityMutation = useMutation({
    mutationFn: (payload: any) => LocationService.createCity(payload),
    onSuccess: invalidateCityList,
  });

  const updateCityMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      LocationService.updateCity(id, payload),
    onSuccess: invalidateCityList,
  });

  const deleteCityMutation = useMutation({
    mutationFn: (id: string) => LocationService.deleteCity(id),
    onSuccess: invalidateCityList,
  });

  /* ============================
     AREA LIST
  ============================ */

  const {
    data: areaList,
    isLoading: isLoadingAreaList,
    error: areaListError,
  } = useQuery({
    queryKey: ["areas", params],
    queryFn: () =>
      LocationService.getAllAreas?.(params as GetAllLocationParams),
    enabled: !!LocationService.getAllAreas,
    keepPreviousData: true,
  });

  const invalidateAreaList = () => {
    queryClient.invalidateQueries({
      queryKey: ["areas", params],
      exact: true,
    });
  };

  const createAreaMutation = useMutation({
    mutationFn: (payload: any) => LocationService.createArea(payload),
    onSuccess: invalidateAreaList,
  });

  const updateAreaMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      LocationService.updateArea(id, payload),
    onSuccess: invalidateAreaList,
  });

  const deleteAreaMutation = useMutation({
    mutationFn: (id: string) => LocationService.deleteArea(id),
    onSuccess: invalidateAreaList,
  });

  return {
    /* City */
    cityList,
    isLoadingCityList,
    cityListError,
    createCity: createCityMutation.mutateAsync,
    updateCity: updateCityMutation.mutateAsync,
    deleteCity: deleteCityMutation.mutateAsync,
    isCreatingCity: createCityMutation.isPending,
    isUpdatingCity: updateCityMutation.isPending,
    isDeletingCity: deleteCityMutation.isPending,

    /* Area */
    areaList,
    isLoadingAreaList,
    areaListError,
    createArea: createAreaMutation.mutateAsync,
    updateArea: updateAreaMutation.mutateAsync,
    deleteArea: deleteAreaMutation.mutateAsync,
    isCreatingArea: createAreaMutation.isPending,
    isUpdatingArea: updateAreaMutation.isPending,
    isDeletingArea: deleteAreaMutation.isPending,
  };
};