import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}`;

export async function login(credentials) {
    return await axios.post(`${API_BASE_URL}/api/auth/login`, credentials);
}

export async function register(data) {
    return await axios.post(`${API_BASE_URL}/api/auth/register`, data);
}
