import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function AppLayout() {
	return (
		<div className="app-layout-wrapper">
			<Header />
			<main className="app-main-content">
				<Outlet />
			</main>

			<Footer />
		</div>
	);
}

export default AppLayout;
