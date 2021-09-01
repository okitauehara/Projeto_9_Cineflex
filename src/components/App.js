import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./Home";
import Filme from "./Filme";
import Sessão from "./Sessão";
import Sucesso from "./Sucesso";

export default function App() {
	<BrowserRouter>
		<Navbar />
		<Switch>
			<Route>
				<Home />
			</Route>
			<Route>
				<Filme />
			</Route>
			<Route>
				<Sessão />
			</Route>
			<Route>
				<Sucesso />
			</Route>
		</Switch>
	</BrowserRouter>
}