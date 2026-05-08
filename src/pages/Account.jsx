import { useState } from "react";
import { Outlet, useNavigate, useRevalidator, useRouteLoaderData } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";
import DeleteAccountModal from "../components/account/DeleteAccountModal";

function Account() {
	const user = useRouteLoaderData("app");
	const revalidator = useRevalidator();
	const navigate = useNavigate();

	const [userInputs, setUserInputs] = useState({
		firstName: user.name.split(" ").at(0),
		lastName: user.name.split(" ").at(-1),
		username: user.username,
		newPassword: "",
		confirmPassword: "",
	});
	const [canSave, setCanSave] = useState(false);
	const [isDifferent, setIsDifferent] = useState(false);

	function handleChange(e) {
		const name = e.target.id;
		let value = e.target.value;

		if (name === "firstName" || name === "lastName") {
			value = value.replace(/\s+/g, "").replace(/[^\p{L}~]/gu, "");
		}
		if (name === "username") {
			value = value.replace(/\s+/g, "").replace(/[^a-zA-Z0-9_@!]/g, "");
		}
		if (name === "newPassword" || name === "confirmPassword") {
			value = value.replaceAll(" ", "");
		}

		setUserInputs((prev) => {
			const updatedState = { ...prev, [name]: value };

			const fullName = `${updatedState.firstName} ${updatedState.lastName}`.trim().toLowerCase();

			const isDifferent = fullName !== user.name.trim().toLowerCase() || updatedState.username !== user.username || updatedState.newPassword !== "" || updatedState.confirmPassword !== "";

			const canSave = updatedState.firstName.trim().length && updatedState.lastName.trim().length && updatedState.username.trim().length >= 6 && (((fullName !== user.name.trim().toLowerCase() || updatedState.username !== user.username) && updatedState.newPassword === updatedState.confirmPassword) || (updatedState.newPassword === updatedState.confirmPassword && updatedState.newPassword.trim().length >= 8 && updatedState.confirmPassword.trim().length >= 8));

			if (isDifferent) {
				setIsDifferent(true);
			} else {
				setIsDifferent(false);
			}

			if (canSave) {
				setCanSave(true);
			} else {
				setCanSave(false);
			}
			return updatedState;
		});
	}

	function handleReset() {
		setUserInputs({
			firstName: user.name.split(" ").at(0),
			lastName: user.name.split(" ").at(-1),
			username: user.username,
			newPassword: "",
			confirmPassword: "",
		});
		setCanSave(false);
		setIsDifferent(false);
	}

	async function saveChanges() {
		const res = await api.put("/user", userInputs);

		if (res.status !== 201) {
			return toast.error(res.data.message);
		} else {
			toast.success(res.data.message);

			setUserInputs({
				firstName: res.data.user.name.split(" ").at(0),
				lastName: res.data.user.name.split(" ").at(-1),
				username: res.data.user.username,
				newPassword: "",
				confirmPassword: "",
			});

			setCanSave(false);
			setIsDifferent(false);

			revalidator.revalidate();
		}
	}

	return (
		<div className="account-page-container">
			<header className="account-header">
				<h1>Configurações da Conta</h1>
				<p>Gerencie suas informações pessoais e credenciais de acesso.</p>
			</header>

			<main className="account-content">
				<section className="account-section">
					<h2>Informações do Perfil</h2>
					<div className="full-name-group">
						<div className="form-group">
							<label htmlFor="firstName">Primeiro nome</label>
							<input type="text" id="firstName" placeholder="Seu nome" onChange={handleChange} value={userInputs.firstName} />
						</div>
						<div className="form-group">
							<label htmlFor="lastName">Último nome</label>
							<input type="text" id="lastName" placeholder="Seu sobrenome" onChange={handleChange} value={userInputs.lastName} />
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="username">Nome de Usuário</label>
						<input type="text" id="username" placeholder="@usuario" onChange={handleChange} value={userInputs.username} />
					</div>
				</section>

				<hr className="divider" />

				<section className="account-section">
					<h2>Segurança</h2>
					<div className="form-group">
						<label htmlFor="newPassword">Nova Senha</label>
						<input type="password" id="newPassword" placeholder="••••••••" onChange={handleChange} value={userInputs.newPassword} />
					</div>
					<div className="form-group">
						<label htmlFor="confirmPassword">Confirmar Nova Senha</label>
						<input type="password" id="confirmPassword" placeholder="••••••••" onChange={handleChange} value={userInputs.confirmPassword} />
					</div>
				</section>

				<div className="account-actions">
					{isDifferent && (
						<button onClick={handleReset} className="btn-redefine">
							Redefinir
						</button>
					)}

					{canSave && (
						<button onClick={saveChanges} className="btn-save">
							Salvar Alterações
						</button>
					)}
				</div>
			</main>

			<section className="danger-zone">
				<div className="danger-zone-text">
					<h2>Zona de Perigo</h2>
					<p>Uma vez que você excluir sua conta, não haverá volta. Todas as suas transações e dados serão apagados permanentemente.</p>
				</div>
				<button onClick={() => navigate("delete")} className="btn-delete-account">
					Deletar minha conta
				</button>
			</section>

			<Outlet />
		</div>
	);
}

export default Account;
