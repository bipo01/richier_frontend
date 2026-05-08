import ChartByEntryAndExpense from "./ChartByEntryAndExpense";
import ChartByCategories from "./ChartByCategories";

function Charts() {
	return (
		<div className="charts-column">
			<ChartByEntryAndExpense />

			<ChartByCategories />
		</div>
	);
}

export default Charts;
