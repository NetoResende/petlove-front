import { useMutation, useQuery } from "@tanstack/react-query"
import { AXIOS, QUERYCLIENT } from "../services"

export const useBuscarMissoes = () => {
    return useQuery({
        queryKey: ["missoes"],
        queryFn: async () => {
            const response = await AXIOS.get("/missoes");
            return response.data
        }
    });
}

export const useCriarMissoes = () => {
    return useMutation({
        mutationFn: async (data) => {
            const response = await AXIOS.post("/missoes", data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            return response.data
        },
        onSuccess: () => {
            QUERYCLIENT.invalidateQueries({
                queryKey: ["missoes"]
            });
        }
    });
}

export const useEditarMissoes = () => {
    return useMutation({
        mutationFn: async (data) => {
            const response = await AXIOS.post(`/missoes/${data.id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            return response.data
        },
        onSuccess: () => {
            QUERYCLIENT.invalidateQueries({
                queryKey: ["missoes"]
            });
        }
    });
}

export const useDeletarMissoes = () => {
    return useMutation({
        mutationFn: async (id) => {
            const response = await AXIOS.delete(`/missoes/${id}`);
            return response.data
        },
        onSuccess: () => {
            QUERYCLIENT.invalidateQueries({
                queryKey: ["missoes"]
            });
        }
    });
}