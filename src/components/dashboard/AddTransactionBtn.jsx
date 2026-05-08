import { useNavigate } from "react-router-dom";

function AddTransactionBtn() {
	const navigate = useNavigate();
	return (
		<button onClick={() => navigate("new-transaction")} type="button" className="btn-add-transaction">
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
				<line x1="12" y1="5" x2="12" y2="19"></line>
				<line x1="5" y1="12" x2="19" y2="12"></line>
			</svg>
			Nova Transação
		</button>
	);
}

export default AddTransactionBtn;
