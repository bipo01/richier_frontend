import { Link, useLoaderData, useNavigate } from "react-router-dom";
import api from "../utils/api";

function Header() {
	const user = useLoaderData();

	const navigate = useNavigate();

	async function handleLogout() {
		const res = await api.get("/user/log-out");

		if (res.status !== 200) return alert("Erro ao sair. Tente novamente");

		navigate("/login");
	}

	return (
		<header className="header-app-container">
			{/* Logo do App */}
			<Link to="/" className="app-logo">
				Richier
			</Link>

			{/* Painel da Direita: Perfil e Ações */}
			<div className="header-right-panel">
				{/* O Perfil inteiro agora é o Link para /account */}
				<Link to="/account" className="user-info">
					<div className="avatar">{user.name.charAt(0)}</div>
					<div className="details">
						<span className="full-name">{user.name}</span>
						<span className="username">@{user.username}</span>
					</div>
				</Link>

				<nav className="header-actions">
					<button onClick={handleLogout} className="btn-logout">
						Sair
					</button>
				</nav>
			</div>
		</header>
	);
}

export default Header;
