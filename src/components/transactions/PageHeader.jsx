import AddTransactionBtn from "../dashboard/AddTransactionBtn";

function PageHeader() {
	return (
		<header className="page-header">
			<div>
				<h1>Todas as Transações</h1>
				<p>Gerencie, filtre e edite seu histórico financeiro.</p>
			</div>

			<AddTransactionBtn />
		</header>
	);
}

export default PageHeader;
