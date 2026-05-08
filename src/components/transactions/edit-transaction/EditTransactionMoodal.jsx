import ModalForm from "./ModalForm";
import ModalHeader from "./ModalHeader";

function EditTransactionModal() {
	return (
		<div className="edit-transaction-modal-container">
			<div className="modal-backdrop"></div>

			<div className="modal-content">
				<ModalHeader />
				<ModalForm />
			</div>
		</div>
	);
}

export default EditTransactionModal;
