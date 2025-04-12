import axios from "axios";

const api = axios.create({
    baseURL: "/api",
});

export const login = async (email: string, password: string) => {
    const response = await api.post("/auth/login", {email, password});
    return response.data;
};

export const register = async (token: string) => {
    const response = await api.post("/auth/register", {token});
    return response.data;
}