import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import Login from "./pages/Login.jsx";
import { loginAction } from "./actions/loginAction.js";
import AppLayout from "./components/AppLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { authLoader } from "./loaders/authLoader.js";
import { queryClient } from "./utils/http.js";
import { dashboardLoader } from "./loaders/dashboardLoader.js";
import NewTransactionModal from "./pages/NewTransactionModal.jsx";
import Transactions from "./pages/Transactions.jsx";
import ContextProvider from "./context/context.jsx";
import Account from "./pages/Account.jsx";
import DeleteAccountModal from "./components/account/DeleteAccountModal.jsx";
import Register from "./pages/Register.jsx";
import { registerAction } from "./actions/registerAction.js";

const router = createBrowserRouter([
	{ path: "/login", element: <Login />, action: loginAction },
	{ path: "/register", element: <Register />, action: registerAction },

	{
		path: "/",
		id: "app",
		element: <AppLayout />,
		children: [
			{ index: true, element: <Navigate to="dashboard" /> },
			{ path: "dashboard", element: <Dashboard />, loader: dashboardLoader, children: [{ path: "new-transaction", element: <NewTransactionModal /> }] },
			{
				path: "transactions",
				element: <Transactions />,
				children: [{ path: "new-transaction", element: <NewTransactionModal /> }],
			},
			{ path: "account", element: <Account />, children: [{ path: "delete", element: <DeleteAccountModal /> }] },
		],
		loader: authLoader,
	},
]);

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ContextProvider>
				<RouterProvider router={router} />
			</ContextProvider>
		</QueryClientProvider>
	);
}

export default App;
