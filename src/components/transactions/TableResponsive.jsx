import { useQuery } from "@tanstack/react-query";
import { getEntries } from "../../utils/http";
import Loader from "../Loader";
import TransactionItem from "./TransactionItem";
import EditTransactionModal from "./edit-transaction/EditTransactionMoodal.jsx";
import ModalDelete from "./delete-transaction/ModalDelete.jsx";
import { useContextProvider } from "../../context/context.js";
import { filterTransactions, formatCurrency } from "../../utils/functions.js";

function TableResponsive() {
	const { data: transactions, isPending } = useQuery({
		queryKey: ["entries"],
		queryFn: getEntries,
	});

	const { typeOfAction, searchBar, selectType, selectCategory, selectedPage, orderBy } = useContextProvider();

	let content = <Loader />;

	if (!isPending) {
		const filteredTransactions = filterTransactions(transactions, selectType, selectCategory, searchBar, orderBy).slice(10 * selectedPage - 10, 10 * selectedPage);
		const total = filteredTransactions.reduce((acc, cur) => {
			const value = cur.type === "in" ? Number(cur.value) : -Number(cur.value);

			return acc + value;
		}, 0);

		content = (
			<table>
				<thead>
					<tr>
						<th>Descrição</th>
						<th>Categoria</th>
						<th>Data</th>
						<th className="align-right">Valor</th>
						<th className="align-center">Ações</th>
					</tr>
				</thead>
				<tbody>
					{filteredTransactions.map((transaction) => {
						const date = new Date(transaction.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" });

						return <TransactionItem key={transaction.id} transaction={transaction} date={date} />;
					})}
				</tbody>

				<tfoot>
					<tr className="row-total">
						<td colSpan="3" className="text-total-label align-right">
							Total:
						</td>
						<td className={`align-right tabular-nums text-total-value ${total > 0 && "text-income"} ${total < 0 && "text-expense"}`}>{formatCurrency(total)}</td>
						<td></td>
					</tr>
				</tfoot>
			</table>
		);
	}

	return (
		<div className="table-responsive">
			{typeOfAction === "edit" && <EditTransactionModal />}
			{typeOfAction === "delete" && <ModalDelete />}
			{content}
		</div>
	);
}

export default TableResponsive;
