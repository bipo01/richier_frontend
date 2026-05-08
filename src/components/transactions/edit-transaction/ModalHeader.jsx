import { useContextProvider } from "../../../context/context.js";

function ModalHeader() {
	const { dispatch } = useContextProvider();
	return (
		<header className="modal-header">
			<h2>Editar Transação</h2>
			<button onClick={() => dispatch({ type: "selectTransaction", payload: { transaction: null, type: null } })} type="button" className="btn-close" aria-label="Fechar">
				&times;
			</button>
		</header>
	);
}

export default ModalHeader;
