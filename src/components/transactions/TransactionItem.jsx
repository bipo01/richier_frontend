import { useContextProvider } from "../../context/context.js";
import { formatCurrency } from "../../utils/functions.js";

function TransactionItem({ transaction, date }) {
	const { dispatch } = useContextProvider();
	return (
		<tr>
			<td className="font-medium text-main">{transaction.description}</td>
			<td>
				<span className="tag-category">{transaction.category}</span>
			</td>
			<td className="text-muted">{date}</td>
			<td className={`align-right font-medium tabular-nums ${transaction.type === "in" ? "text-income" : "text-expense"}`}>
				{transaction.type === "in" ? "+" : "-"}
				{formatCurrency(transaction.value)}
			</td>
			<td className="align-center actions-cell">
				<button onClick={() => dispatch({ type: "selectTransaction", payload: { transaction, type: "edit" } })} className="btn-icon edit" title="Editar transação">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
						<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
					</svg>
				</button>
				<button onClick={() => dispatch({ type: "selectTransaction", payload: { transaction, type: "delete" } })} className="btn-icon delete" title="Excluir transação">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<polyline points="3 6 5 6 21 6"></polyline>
						<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
						<line x1="10" y1="11" x2="10" y2="17"></line>
						<line x1="14" y1="11" x2="14" y2="17"></line>
					</svg>
				</button>
			</td>
		</tr>
	);
}

export default TransactionItem;
