import "./Assentos.css";

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function Assentos() {

    const { idSessao } = useParams();
    const [sessao, setSessao] = useState([]);
    const [selecao, setSelecao] = useState('assento');

    useEffect(() => {
        const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v3/cineflex/showtimes/${idSessao}/seats`);
        promise.then((resp) => {
            setSessao(resp.data.seats);
        });
    }, []);

    return (
        <>
            <h1>Selecione o(s) assento(s)</h1>
            <ul className="assentos">
            {sessao.map((assento) => (
                <li key={assento.id} className={assento.isAvailable ? selecao : 'assento indisponivel'}>{(assento.name).padStart(2, '0')}</li>
            ))}
            </ul>
            <ul className="bloco-legenda">
                <div className="legenda">
                    <li className="assento selecionado"></li>
                    <span className="nome-legenda">Selecionado</span>
                </div>
                <div className="legenda">
                    <li className="assento"></li>
                    <span className="nome-legenda">Disponível</span>
                </div>
                <div className="legenda">
                    <li className="assento indisponivel"></li>
                    <span className="nome-legenda">Indisponível</span>
                </div>
            </ul>
            <div className="infos-comprador">
            <h2 className="dados-comprador">Nome do comprador:</h2>
            <input type="text" placeholder="Digite seu nome..."></input>
            <h2 className="dados-comprador">CPF do comprador</h2>
            <input type="text" placeholder="Digite seu CPF..."></input>
            </div>
            <div className="centralizar-botao">
                <button>Reservar assento(s)</button>
            </div>
        </>
    );
}