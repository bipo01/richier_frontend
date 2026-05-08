import { useNavigate } from "react-router-dom";
import ModalForm from "../components/dashboard/new-transaction/ModalForm";
import ModalHeader from "../components/dashboard/new-transaction/ModalHeader";

function NewTransactionModal() {
	const navigate = useNavigate();

	function onClose() {
		navigate("..");
	}

	return (
		<div className="new-transaction-modal-container">
			<div className="modal-backdrop"></div>

			<div className="modal-content">
				<ModalHeader onClose={onClose} />
				<ModalForm onClose={onClose} />
			</div>
		</div>
	);
}

export default NewTransactionModal;
