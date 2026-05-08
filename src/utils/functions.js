export const formatCurrency = (value) => {
	return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
};

export const generateProfessionalColors = (count) => {
	const colors = [];
	const step = 360 / count; // Divide o círculo cromático em partes iguais
	const offset = Math.floor(Math.random() * 360); // Ponto de partida aleatório

	for (let i = 0; i < count; i++) {
		const hue = Math.floor((i * step + offset) % 360);
		// Saturação (40-60%) e Luminosidade (35-55%) travadas para tons maduros e elegantes
		const saturation = Math.floor(40 + Math.random() * 20);
		const lightness = Math.floor(35 + Math.random() * 20);
		colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
	}

	// Embaralha o array para que cores parecidas não fiquem lado a lado no gráfico
	for (let i = colors.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[colors[i], colors[j]] = [colors[j], colors[i]];
	}

	return colors;
};

export function filterTransactions(transactions = "", selectType = "", selectCategory = "", searchBar = "", orderBy = "newest") {
	const filteredTransactions = transactions
		.filter((t) => {
			const date1 = new Date(t.date);
			const date2 = date1.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
			const date3 = date1.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

			const { category, description, date, value } = t;

			if (
				[date, String(date1), date2, date3, category, description, value].some((el) => {
					return el.toLowerCase().includes(searchBar.toLowerCase());
				})
			)
				return true;
		})
		.filter((t) => {
			if (selectType === "") return true;
			if (t.type === selectType) return true;
		})
		.filter((t) => (selectCategory === "" ? true : t.category.toLowerCase() === selectCategory.toLowerCase()));

	let order;
	if (orderBy === "newest") {
		order = (a, b) => {
			const aDate = new Date(a.date).getTime();
			const bDate = new Date(b.date).getTime();

			if (aDate !== bDate) {
				return bDate - aDate;
			}

			return b.id - a.id;
		};
	}
	if (orderBy === "oldest") {
		order = (a, b) => {
			const aDate = new Date(a.date).getTime();
			const bDate = new Date(b.date).getTime();

			if (aDate !== bDate) {
				return aDate - bDate;
			}

			return a.id - b.id;
		};
	}
	if (orderBy === "highest") {
		order = (a, b) => {
			const aValue = a.type === "in" ? Number(a.value) : Number(-a.value);
			const bValue = b.type === "in" ? Number(b.value) : Number(-b.value);

			return bValue - aValue;
		};
	}

	if (orderBy === "lowest") {
		order = (a, b) => {
			const aValue = a.type === "in" ? Number(a.value) : Number(-a.value);
			const bValue = b.type === "in" ? Number(b.value) : Number(-b.value);

			return aValue - bValue;
		};
	}

	return filteredTransactions.sort(order);
}
