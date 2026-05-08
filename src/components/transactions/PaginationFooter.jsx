import { useContextProvider } from "../../context/context.js";
import { filterTransactions } from "../../utils/functions";
import { getEntries } from "../../utils/http";
import { useQuery } from "@tanstack/react-query";

function PaginationFooter() {
	const { data: transactions, isPending } = useQuery({
		queryKey: ["entries"],
		queryFn: getEntries,
	});

	const { searchBar, selectType, selectCategory, selectedPage, dispatch } = useContextProvider();

	let content = (
		<>
			<span className="pagination-info">
				Mostrando <strong>0</strong> a <strong>0</strong> de <strong>0</strong> resultados
			</span>
			<div className="pagination-controls">
				<button disabled>Anterior</button>
				<button className="active">1</button>
				<button>2</button>
				<button>3</button>
				<span>...</span>
				<button>5</button>
				<button>Próxima</button>
			</div>
		</>
	);

	if (!isPending) {
		const filteredTransactions = filterTransactions(transactions, selectType, selectCategory, searchBar);
		const pages = Math.ceil(filteredTransactions.length / 10);

		content = (
			<>
				<span className="pagination-info">
					Mostrando <strong>{selectedPage * 10 - 9}</strong> a <strong>{filteredTransactions.length > selectedPage * 10 ? 10 : filteredTransactions.length}</strong> de <strong>{filteredTransactions.length}</strong> resultados
				</span>
				<div className="pagination-controls">
					{Array.from({ length: pages }).map((_, i) => (
						<button onClick={() => dispatch({ type: "selectPage", payload: i + 1 })} className={`${selectedPage === i + 1 ? "active" : ""} btn-page`} key={i + 1}>
							{i + 1}
						</button>
					))}
				</div>
			</>
		);
	}

	return <footer className="pagination-footer">{content}</footer>;
}

export default PaginationFooter;
