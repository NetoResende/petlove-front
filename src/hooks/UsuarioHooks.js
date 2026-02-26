import { useMutation } from "@tanstack/react-query"
import { AXIOS } from "../services"

export const useLogin = () =>{
    return useMutation({
        mutationFn: async (data) => {
            const response = await AXIOS.post("/login", data)
            return response.data
        }
    })
}