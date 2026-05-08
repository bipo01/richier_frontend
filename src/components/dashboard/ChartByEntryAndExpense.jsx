import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, Legend } from "recharts";

import { useQuery } from "@tanstack/react-query";
import { getEntries } from "../../utils/http";
import Loader from "../Loader";
import { useState } from "react";

function ChartByEntryAndExpense() {
	const { data: entries, isPending } = useQuery({
		queryKey: ["entries"],
		queryFn: getEntries,
	});

	const [period, setPeriod] = useState({ startDate: "", endDate: "" });

	const COLORS = {
		income: "#115e59",
		expense: "#b91c1c",
	};
	const cashFlowData = !isPending
		? [
				entries
					.filter((entry) => {
						const entryDate = new Date(entry.date);
						const startDate = period.startDate !== "" ? new Date(period.startDate) : 0;
						const endDate = period.endDate !== "" ? new Date(`${period.endDate}T23:59:59`) : new Date();

						if (entryDate >= startDate && entryDate <= endDate) return true;
					})
					.reduce(
						(acc, cur) => {
							if (cur.type === "in") {
								acc.Receitas += Number(cur.value);
							} else if (cur.type === "out") {
								acc.Despesas += Number(cur.value);
							}

							return acc;
						},
						{
							date: `${period.startDate ? new Date(period.startDate + "T00:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }) : "Data indefinida"} - ${period.endDate ? new Date(period.endDate + "T00:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }) : "Data indefinida"}`,
							Receitas: 0,
							Despesas: 0,
						},
					),
			]
		: [];

	function handleDate(e) {
		setPeriod((prev) => {
			if (e.target.name === "startDate" && e.target.value > period.endDate && period.endDate !== "") {
				const updated = { ...prev, [e.target.name]: e.target.value, endDate: e.target.value };
				return updated;
			}

			return { ...prev, [e.target.name]: e.target.value };
		});
	}

	let content = isPending ? (
		<Loader />
	) : (
		<div className="chart-container">
			<ResponsiveContainer width="100%" height="100%">
				<BarChart data={cashFlowData} margin={{ top: 10, right: 10, bottom: 0 }}>
					<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
					<XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} dy={10} />
					<YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} tickFormatter={(value) => `R$${value}`} />
					<Tooltip cursor={{ fill: "#f8fafc" }} />
					<Legend iconType="circle" wrapperStyle={{ fontSize: "14px", paddingTop: "10px" }} />
					<Bar dataKey="Receitas" fill={COLORS.income} radius={[8, 8, 0, 0]} maxBarSize={80} />
					<Bar dataKey="Despesas" fill={COLORS.expense} radius={[8, 8, 0, 0]} maxBarSize={80} />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);

	return (
		<section className="content-panel chart-section">
			<div className="panel-header">
				<h2>Fluxo de Caixa</h2>
				<div className="filters date-filters">
					<input type="date" name="startDate" aria-label="Data inicial" onChange={handleDate} value={period.startDate} />
					<span>até</span>
					<input min={period.startDate} max={`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`} type="date" name="endDate" aria-label="Data final" onChange={handleDate} value={period.endDate} />
				</div>
			</div>
			{content}
		</section>
	);
}

export default ChartByEntryAndExpense;
