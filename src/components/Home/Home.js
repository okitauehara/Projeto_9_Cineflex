import "./Home.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {

    const [filmes, setFilmes] = useState([])
    
    useEffect(() => {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/cineflex/movies");
        promise.then((resp) => {
            setFilmes(resp.data);
        });
    }, []);

    return (
        <>
            <h1>Selecione o filme</h1>
            <section className="filmes">
                {filmes.map((filme) => (
                    <Link to={`/filme/${filme.id}`}>
                        <div key={filme.id} className="filme">
                            <img className="menu-img" src={filme.posterURL} />
                        </div>
                    </Link>))}
            </section>
        </>
    );
}