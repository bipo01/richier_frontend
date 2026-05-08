import { Form, Link, useActionData } from "react-router-dom";

function Register() {
	const errorMessage = useActionData();

	return (
		<div className="register-container">
			<Form method="post">
				<h1>Crie sua conta</h1>

				<div className="inputs-group">
					<div className="name-group">
						<input type="text" name="firstName" placeholder="Primeiro Nome" required onInput={(e) => (e.target.value = e.target.value.replace(/[^\p{L}\p{M}~^´`'¨˜ˆ]/gu, ""))} />
						<input type="text" name="lastName" placeholder="Sobrenome" required onInput={(e) => (e.target.value = e.target.value.replace(/[^\p{L}\p{M}~^´`'¨˜ˆ]/gu, ""))} />
					</div>

					<input type="text" name="username" placeholder="Nome de usuário" required onInput={(e) => (e.target.value = e.target.value.replace(/[^a-zA-Z0-9!@_]/g, ""))} />

					<input type="password" name="password" placeholder="Senha" required onInput={(e) => (e.target.value = e.target.value.replace(/\s/g, ""))} />

					<input type="password" name="confirmPassword" placeholder="Confirmar Senha" required onInput={(e) => (e.target.value = e.target.value.replace(/\s/g, ""))} />
				</div>

				<button type="submit">Cadastrar</button>
				<Link to="/login">Já tenho uma conta</Link>

				{errorMessage && <p className="error-message">{errorMessage}</p>}
			</Form>
		</div>
	);
}

export default Register;
