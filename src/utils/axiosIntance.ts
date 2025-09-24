// api.ts
import axios from "axios";

const baseURL: string = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1/";

export const axiosNoAuth = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        // cors block issue
        "Access-Control-Allow-Origin": "*",
    },
});

export const axiosAuth = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        // cors block issue
        "Access-Control-Allow-Origin": "*",
    },
});

// Add token interceptor only for axiosAuth
axiosAuth.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
