import { formatCurrency } from "../../utils/functions";
import { useQuery } from "@tanstack/react-query";
import { getEntries } from "../../utils/http";
import Loader from "../Loader";

function Table() {
	const { data: entries, isPending } = useQuery({
		queryKey: ["entries"],
		queryFn: getEntries,
	});

	let content = isPending ? (
		<Loader />
	) : (
		<div className="table-container">
			<table>
				<tbody>
					{entries.length < 1 ? (
						<p className="p-no-data">Sem dados</p>
					) : (
						entries.slice(0, 10).map((transaction) => {
							console.log(transaction);
							// CORREÇÃO AQUI: Adicionado timeZone: "UTC"
							const date = new Date(transaction.date).toLocaleDateString("pt-BR", {
								timeZone: "UTC",
								day: "2-digit",
								month: "2-digit",
								year: "numeric",
							});

							return (
								<tr key={transaction.id}>
									<td className="desc-cell">
										<span className="transaction-title">{transaction.description}</span>
										<span className="transaction-category">
											{transaction.category} • {date}
										</span>
									</td>
									<td className={`amount-cell ${transaction.type === "in" ? "income" : "expense"}`}>
										{transaction.type === "in" ? "+" : "-"}
										{formatCurrency(transaction.value)}
									</td>
								</tr>
							);
						})
					)}
				</tbody>
			</table>
		</div>
	);

	return (
		<aside className="content-panel table-section">
			<div className="panel-header">
				<h2>Últimas Transações</h2>
				<a href="/transactions" className="view-all">
					Ver todas
				</a>
			</div>
			{content}
		</aside>
	);
}

export default Table;
