import { useContextProvider } from "../../context/context";
import { useQuery } from "@tanstack/react-query";
import { getEntries } from "../../utils/http";

function Toolbar() {
	const { searchBar, selectType, selectCategory, orderBy, dispatch } = useContextProvider();

	const { data } = useQuery({
		queryKey: ["entries"],
		queryFn: getEntries,
	});

	const categories = data ? [...new Set(data.map((e) => e.category))] : [];

	return (
		<div className="toolbar">
			<div className="search-box">
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<circle cx="11" cy="11" r="8"></circle>
					<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
				</svg>
				<input value={searchBar} onChange={(e) => dispatch({ type: "changeSearchBar", payload: e.target.value })} type="text" placeholder="Buscar por descrição..." aria-label="Buscar transações" />
			</div>

			<div className="filters-group">
				<select value={orderBy} onChange={(e) => dispatch({ type: "changeOrderBy", payload: e.target.value })} name="sortFilter" aria-label="Classificar por">
					<option value="newest">Mais Recente</option>
					<option value="oldest">Mais Antigo</option>
					<option value="highest">Maior Valor</option>
					<option value="lowest">Menor Valor</option>
				</select>

				<select value={selectType} onChange={(e) => dispatch({ type: "changeSelectType", payload: e.target.value })} name="typeFilter" aria-label="Filtrar por tipo">
					<option value="">Todos os Tipos</option>
					<option value="in">Receitas</option>
					<option value="out">Despesas</option>
				</select>

				<select value={selectCategory} onChange={(e) => dispatch({ type: "changeSelectCategory", payload: e.target.value })} name="categoryFilter" aria-label="Filtrar por categoria">
					<option value="">Todas as Categorias</option>
					{categories.map((category) => (
						<option key={category} value={category}>
							{category}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}

export default Toolbar;
