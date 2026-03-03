import { useMutation, useQuery } from "@tanstack/react-query"
import { AXIOS, QUERYCLIENT } from "../services"

export const useBuscarConcorrente = () => {
    return useQuery({
        queryKey: ["concorrentes"],
        queryFn: async () => {
            const response = await AXIOS.get("/concorrentes");
            return response.data
        }
    });
}

export const useCriarConcorrente = () => {
    return useMutation({
        mutationFn: async (data) => {
            const response = await AXIOS.post("/concorrentes", data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            return response.data
        },
        onSuccess: () => {
            QUERYCLIENT.invalidateQueries({
                queryKey: ["concorrentes"]
            });
        }
    });
}

export const useEditarConcorrente = () => {
    return useMutation({
        mutationFn: async (data) => {
            const response = await AXIOS.post(`/concorrentes/${data.id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            return response.data
        },
        onSuccess: () => {
            QUERYCLIENT.invalidateQueries({
                queryKey: ["concorrentes"]
            });
        }
    });
}

export const useDeletarConcorrente = () => {
    return useMutation({
        mutationFn: async (id) => {
            const response = await AXIOS.delete(`/concorrentes/${id}`);
            return response.data
        },
        onSuccess: () => {
            QUERYCLIENT.invalidateQueries({
                queryKey: ["concorrentes"]
            });
        }
    });
}