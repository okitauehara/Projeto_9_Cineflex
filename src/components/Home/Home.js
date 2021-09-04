import "./Home.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {

    const [filmes, setFilmes] = useState([])
    
    useEffect(() => {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v3/cineflex/movies");
        promise.then((resp) => {
            setFilmes(resp.data);
        });
    }, []);

    return (
        <main>
            <h1>Selecione o filme</h1>
            <section className="filmes">
                {filmes.map((filme, index) => (
                    <Filme 
                        key={index}
                        alt={filme.title}
                        idFilme={filme.id}
                        src={filme.posterURL}
                        />))}
            </section>
        </main>
    );
}

function Filme({ alt, idFilme, src }) {
    return (
        <Link to={`/sessoes/${idFilme}`}>
            <img className="menu-img" src={src} alt={alt} />
        </Link>
    );
}