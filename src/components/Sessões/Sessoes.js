import "./Sessoes.css";
import Rodape from "../../shared/Rodape/Rodape";
import Loading from "../../shared/Loading/Loading";
import VoltarPagina from "../../shared/Voltar_Página/VoltarPagina";

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";


export default function Sessoes() {

    const { idFilme } = useParams();
    const [sessoes, setSessoes] = useState([]);
    const [filme, setFilme] = useState([])

    useEffect(() => {
        const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v3/cineflex/movies/${idFilme}/showtimes`);
        promise.then((resp) => {
            setSessoes(resp.data.days);
            setFilme(resp.data);
        });
    }, [idFilme]);

    if (sessoes.length === 0) {
        return <Loading />
    } else {
        return (
            <main>
                <h1>Selecione o horário</h1>
                <VoltarPagina caminho={"/"}/>
                <section className="sessoes">
                    {sessoes.map((sessao, index) => (
                        <Sessao 
                            key={index}
                            diaSemana={sessao.weekday}
                            diaMes={sessao.date}
                            horarios={sessao.showtimes}
                            id={sessao.id}
                            idFilme={idFilme}
                            />
                    ))}
                </section>
                <Rodape filme={filme}/>
            </main>
        );
    }
}

function Sessao({ diaSemana, diaMes, horarios, id, idFilme }) {
    return (
        <div key={id} className="sessao">
            <h2 className="data">{diaSemana} - {diaMes}</h2>
            <div className="horarios">
            {horarios.map((horario, index) => (
            <Horario 
                key={index}
                idSessao={horario.id}
                nome={horario.name}
                idFilme={idFilme}
                />))}
            </div>
        </div>
    );
}

function Horario({ idSessao, nome, idFilme }) {
    return (
        <Link to={`/sessoes/${idFilme}/assentos/${idSessao}`} style={{textDecoration: 'none'}}>
            <span key={idSessao} className="horario">{nome}</span>
        </Link>
    );
}