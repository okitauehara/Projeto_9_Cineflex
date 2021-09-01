import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./Navbar";
import Home from "./Home";
import Filme from "./Filme";
import Sessão from "./Sessão";
import Sucesso from "./Sucesso";

export default function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route path="/" exact>
					<Home />
				</Route>
				<Route path="/filme" exact>
					<Filme />
				</Route>
				<Route path="/sessao" exact>
					<Sessão />
				</Route>
				<Route path="/sucesso" exact>
					<Sucesso />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}