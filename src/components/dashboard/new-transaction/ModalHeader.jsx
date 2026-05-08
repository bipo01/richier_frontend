function ModalHeader({ onClose }) {
	return (
		<header className="modal-header">
			<h2>Nova Transação</h2>
			<button onClick={onClose} type="button" className="btn-close" aria-label="Fechar">
				&times;
			</button>
		</header>
	);
}

export default ModalHeader;
