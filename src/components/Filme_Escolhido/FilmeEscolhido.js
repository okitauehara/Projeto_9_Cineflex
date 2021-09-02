import "./FilmeEscolhido.css";

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function FilmeEscolhido() {

    const { idFilme } = useParams();
    const [filme, setFilme] = useState([]);

    useEffect(() => {
        const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/cineflex/movies/${idFilme}/showtimes`);
        promise.then((resp) => {
            setFilme(resp.data.days);
        });
    }, []);

    return (
        <>
            <h1>Selecione o horário</h1>
            <section className="sessoes">
                {filme.map((sessao) => (
                    <div key={sessao.id} className="sessao">
                        <h2 className="data">{sessao.weekday} - {sessao.date}</h2>
                        <div className="horarios">
                        {sessao.showtimes.map((horario) => (
                            <Link to={`/sessao/${horario.id}`} style={{textDecoration: 'none'}}>
                                <span key={horario.id} className="horario">{horario.name}</span>
                            </Link>
                        ))}
                        </div>
                    </div>
                ))}
            </section>
            <footer>
            </footer>
        </>
    );
}