import { createContext } from "react";
import { useContext } from "react";

export const PostContext = createContext();

export function useContextProvider() {
	const context = useContext(PostContext);

	return context;
}
