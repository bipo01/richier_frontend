import { ResponsiveContainer, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";
import { generateProfessionalColors } from "../../utils/functions";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getEntries } from "../../utils/http";
import Loader from "../Loader";
import { useState } from "react";

function ChartByCategories() {
	const { data: entries, isPending } = useQuery({
		queryKey: ["entries"],
		queryFn: getEntries,
	});
	const [filter, setFilter] = useState("expense");

	const categoryData = entries
		? [...new Set(entries.map((entry) => entry.category))]
				.map((category) => {
					const value = filter === "expense" ? entries.filter((entry) => entry.type === "out" && entry.category === category).reduce((acc, cur) => acc + Number(cur.value), 0) : entries.filter((entry) => entry.type === "in" && entry.category === category).reduce((acc, cur) => acc + Number(cur.value), 0);

					if (!value) return;

					return { name: category ? category : "Sem categoria", value };
				})
				.filter((e) => e)
		: [];

	const donutColors = useMemo(() => {
		return generateProfessionalColors(categoryData.length);
	}, [categoryData.length, filter]);

	let content = (
		<>
			<div className="panel-header">
				<h2>Por Categoria</h2>
				<div className="filters type-filters">
					<select name="transactionType" value={filter} onChange={(e) => setFilter(e.target.value)}>
						<option value="expense">Despesas</option>
						<option value="income">Receitas</option>
					</select>
				</div>
			</div>
			{categoryData.length ? (
				<div className="chart-container">
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={7} dataKey="value" stroke="none">
								{categoryData.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={donutColors[index]} />
								))}
							</Pie>
							<Tooltip />
							<Legend iconType="circle" layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: "14px" }} />
						</PieChart>
					</ResponsiveContainer>
				</div>
			) : (
				<p className="p-no-data">Sem dados</p>
			)}
		</>
	);

	if (isPending) content = <Loader />;

	return <section className="content-panel chart-section">{content}</section>;
}

export default ChartByCategories;
