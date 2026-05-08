import { Form, Link, useActionData } from "react-router-dom";

function Login() {
	const errorMessage = useActionData();

	return (
		<div className="login-container">
			<Form method="post">
				<h1>Bem-vindo de volta!</h1>
				<div className="inputs-group">
					<input type="text" name="username" id="username" placeholder="Nome de usuário" required onInput={(e) => (e.target.value = e.target.value.replace(/[^a-zA-Z0-9!@_]/g, ""))} />
					<input type="password" name="password" id="password" placeholder="Senha" required onInput={(e) => (e.target.value = e.target.value.replace(/\s/g, ""))} />
				</div>
				<button type="submit">Entrar</button>
				<Link to="/register">Criar uma nova conta</Link>

				{errorMessage && <p className="error-message">{errorMessage}</p>}
			</Form>
		</div>
	);
}

export default Login;
