import axios from "axios";

export const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	headers: {'x-apikey': '60eb09146661365596af552f'}
});



