import { useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import { qboxServices } from "../services/qbox.service";
import type { QboxParams } from "../types/AllQboxTypes";
import { useParams } from "react-router-dom";
export const useQbox = (params?: QboxParams) => {
    const queryClient = useQueryClient();
    const {id} = useParams<{id: string}>();
    const { data: QboxList, isLoading: isLoadingQboxList, error: QboxListError } = useQuery({
        queryKey: ["qbox", params],
        queryFn: () => qboxServices.getAllQbox(params as QboxParams)
    })
    const {data:Qbox, isLoading:isLoadingQbox, error:QboxError} = useQuery({
        queryKey: ["single-qbox", id],
        queryFn:() => qboxServices.getSingleQbox(id as string),
        enabled: !!id,
        staleTime: 1000 * 60 * 10,
    })

    const deleteMutation = useMutation({
        mutationFn:(id: string) => qboxServices.DeleteQbox(id),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["qbox"]})
        }
    })
    return {
        QboxList,
        isLoadingQboxList,
        QboxListError,
        Qbox,
        isLoadingQbox,
        QboxError,
        deleteQbox:deleteMutation.mutate
    }
}