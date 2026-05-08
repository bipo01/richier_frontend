import InfoCards from "../components/dashboard/InfoCards";
import Charts from "../components/dashboard/Charts";
import Table from "../components/dashboard/Table";
import AddTransactionBtn from "../components/dashboard/AddTransactionBtn";
import { Outlet } from "react-router-dom";

function Dashboard() {
	return (
		<div className="dashboard-container">
			<Outlet />
			<header className="dashboard-header">
				<h1>Visão Geral</h1>
				<AddTransactionBtn />
			</header>

			<InfoCards />

			<div className="main-content-grid">
				<Charts />
				<Table />
			</div>
		</div>
	);
}

export default Dashboard;
