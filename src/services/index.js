import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const AXIOS = axios.create({
    baseURL: "https://petlove-back.onrender.com"
})

export const QUERYCLIENT = new QueryClient();