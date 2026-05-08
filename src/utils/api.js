import axios from "axios";

// const BASE_URL = "http://localhost:3000/api/";
const BASE_URL = "https://richier-backend.vercel.app/api/";

const api = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
	validateStatus: () => true,
});

export default api;
