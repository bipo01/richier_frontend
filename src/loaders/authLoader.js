import { redirect } from "react-router-dom";
import api from "../utils/api";

export async function authLoader() {
	const res = await api.get("/user/logged");

	if (res.status !== 200) return redirect("/login");

	return res.data;
}
