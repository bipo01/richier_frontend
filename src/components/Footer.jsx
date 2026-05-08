import { Link } from "react-router-dom";

function Footer() {
	// Pega o ano atual dinamicamente para o copyright
	const currentYear = new Date().getFullYear();

	return (
		<footer className="footer-app-container">
			<div className="footer-content">
				<div className="footer-brand">
					<Link to="/" className="app-logo">
						Richier
					</Link>
					<p>Organizando suas finanças com eficiência e elegância.</p>
				</div>

				<nav className="footer-links">
					<Link to="/about">Sobre</Link>
					<Link to="/privacy">Privacidade</Link>
					<Link to="/terms">Termos</Link>
					<Link to="/contact">Contato</Link>
				</nav>
			</div>

			<div className="footer-bottom">
				<p>&copy; {currentYear} Richier. Todos os direitos reservados.</p>
			</div>
		</footer>
	);
}

export default Footer;
