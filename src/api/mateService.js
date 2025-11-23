// mateService.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;



// Helper: obtiene el token más reciente desde localStorage
const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Obtener productos
export async function getAllProducts(busqueda) {
    return await axios.get(`${API_BASE_URL}/api/product?name=${busqueda || ''}`);
}

// Crear (FormData o JSON)
export async function createProduct(product) {
    const headers = {
        ...getAuthHeader(),
    };

    return await axios.post(`${API_BASE_URL}/api/product`, product, { headers });
}

// Modificar (FormData o JSON)
export function updateProduct(id, product) {
    const headers = {
        ...getAuthHeader(),

    };

    return axios.put(`${API_BASE_URL}/api/product/${id}`, product, { headers });
}

// Eliminar
export function removeProduct(id) {
    return axios.delete(`${API_BASE_URL}/api/product/${id}`, {
        headers: getAuthHeader(),
    });
}
