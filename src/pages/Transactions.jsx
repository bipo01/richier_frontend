import { Outlet } from "react-router-dom";
import PageHeader from "../components/transactions/PageHeader";
import TransactionsCard from "../components/transactions/TransactionsCard";
import InfoCards from "../components/dashboard/InfoCards";

function Transactions() {
	return (
		<div className="transactions-container">
			<Outlet />
			<PageHeader />
			<InfoCards />
			<TransactionsCard />
		</div>
	);
}

export default Transactions;
