import api from "./api";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function getEntries({ signal }) {
	const res = await api.get("/entries", { signal: signal });

	if (res.status !== 200) throw new Error(res.data.message);

	return res.data;
}

export async function newEntry(data) {
	const res = await api.post("/entries", data);

	if (res.status !== 201) throw new Error(res.data.message);

	return res.data;
}

export async function editEntry(data) {
	const res = await api.put(`/entries/${data.id}`, data);

	if (res.status !== 201) throw new Error(res.data.message);

	return res.data;
}

export async function deleteEntry(data) {
	console.log(data);
	const res = await api.delete(`/entries/${data.id}`);

	if (res.status !== 201) throw new Error(res.data.message);

	return res.data;
}
