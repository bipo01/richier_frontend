import { useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function DeleteAccountModal() {
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	async function deleteAccount() {
		const res = await api.post("/user", { password });

		if (res.status !== 201) {
			return toast.error(res.data.message);
		}

		navigate("/login");
	}

	return (
		<div className="delete-account-overlay">
			<div className="delete-account-modal">
				<header className="modal-header">
					<h2>Excluir Conta</h2>
					<button className="btn-close" aria-label="Fechar modal" onClick={() => navigate("..")}>
						&times;
					</button>
				</header>

				<div className="modal-body">
					<p>Tem certeza que deseja excluir sua conta? Esta ação não poderá ser desfeita e todos os seus dados serão apagados permanentemente.</p>

					<div className="password-group">
						<label htmlFor="deletePassword">Para confirmar, digite sua senha:</label>
						<input type="password" id="deletePassword" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
					</div>
				</div>

				<footer className="modal-footer">
					<button onClick={() => navigate("..")} className="btn-cancel">
						Cancelar
					</button>
					<button onClick={deleteAccount} className="btn-confirm-delete">
						Quero deletar minha conta
					</button>
				</footer>
			</div>
		</div>
	);
}

export default DeleteAccountModal;
