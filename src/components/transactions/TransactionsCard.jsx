import PaginationFooter from "./PaginationFooter";
import TableResponsive from "./TableResponsive";
import Toolbar from "./Toolbar";

function TransactionsCard() {
	return (
		<div className="transactions-card">
			<Toolbar />

			<TableResponsive />

			<PaginationFooter />
		</div>
	);
}

export default TransactionsCard;
