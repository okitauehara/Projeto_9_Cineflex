import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./reset.css";
import "./style.css";

import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import FilmeEscolhido from "../Filme_Escolhido/FilmeEscolhido";
import SessaoEscolhida from "../Sessão_Escolhida/SessaoEscolhida";
import Sucesso from "../Sucesso/Sucesso";

export default function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route path="/" exact>
					<Home />
				</Route>
				<Route path="/filme/:idFilme" exact>
					<FilmeEscolhido />
				</Route>
				<Route path="/sessao/:idSessao" exact>
					<SessaoEscolhida />
				</Route>
				<Route path="/sucesso" exact>
					<Sucesso />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}