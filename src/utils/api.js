import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api/";

const api = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
	validateStatus: () => true,
});

export default api;
