import { formatCurrency } from "../../utils/functions";
import { useQuery } from "@tanstack/react-query";
import { getEntries } from "../../utils/http";

function InfoCards() {
	const { data, isPending } = useQuery({
		queryKey: ["entries"],
		queryFn: getEntries,
	});

	const income = data?.filter((e) => e.type === "in").reduce((acc, cur) => acc + Number(cur.value), 0);
	const expenses = data?.filter((e) => e.type === "out").reduce((acc, cur) => acc + Number(cur.value), 0);

	const content = !isPending ? (
		<>
			<div className="card balance">
				<h3>Saldo Atual</h3>
				<p className="amount">{formatCurrency(income - expenses)}</p>
			</div>
			<div className="card income">
				<h3>Receitas</h3>
				<p className="amount">{formatCurrency(income)}</p>
			</div>
			<div className="card expenses">
				<h3>Despesas</h3>
				<p className="amount">{formatCurrency(expenses)}</p>
			</div>
		</>
	) : (
		<>
			<div className="card balance">
				<h3>Saldo Atual</h3>
				<p className="amount">0</p>
			</div>
			<div className="card income">
				<h3>Receitas</h3>
				<p className="amount">0</p>
			</div>
			<div className="card expenses">
				<h3>Despesas</h3>
				<p className="amount">0</p>
			</div>
		</>
	);

	return <section className="info-cards">{content}</section>;
}

export default InfoCards;
