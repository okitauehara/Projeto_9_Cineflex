import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./reset.css";
import "./style.css";

import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import Sessoes from "../Sessões/Sessoes";
import Assentos from "../Assentos/Assentos";
import Sucesso from "../Sucesso/Sucesso";

export default function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route path="/" exact>
					<Home />
				</Route>
				<Route path="/sessoes/:idFilme" exact>
					<Sessoes />
				</Route>
				<Route path="/assentos/:idSessao" exact>
					<Assentos />
				</Route>
				<Route path="/sucesso" exact>
					<Sucesso />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}