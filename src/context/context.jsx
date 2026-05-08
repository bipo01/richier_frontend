import { useReducer } from "react";
import { PostContext } from "./context.js";

const initialState = {
	selectedTransaction: null,
	typeOfAction: null,

	searchBar: "",
	selectType: "",
	selectCategory: "",
	orderBy: "newest",

	selectedPage: 1,
};

function reducer(state, action) {
	switch (action.type) {
		case "selectTransaction":
			return { ...state, selectedTransaction: action.payload.transaction, typeOfAction: action.payload.type };

		case "changeSearchBar":
			return { ...state, searchBar: action.payload, selectedPage: 1 };
		case "changeSelectType":
			return { ...state, selectType: action.payload, selectedPage: 1 };
		case "changeSelectCategory":
			return { ...state, selectCategory: action.payload, selectedPage: 1 };
		case "changeOrderBy":
			return { ...state, orderBy: action.payload };

		case "selectPage":
			return { ...state, selectedPage: action.payload };

		default:
			return state;
	}
}

function ContextProvider({ children }) {
	const [{ selectedTransaction, typeOfAction, searchBar, selectType, selectCategory, selectedPage, orderBy }, dispatch] = useReducer(reducer, initialState);
	return <PostContext.Provider value={{ selectedTransaction, typeOfAction, searchBar, selectType, selectCategory, selectedPage, orderBy, dispatch }}>{children}</PostContext.Provider>;
}

export default ContextProvider;
