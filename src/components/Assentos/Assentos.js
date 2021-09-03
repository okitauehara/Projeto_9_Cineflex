import "./Assentos.css";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Assentos() {

    const { idSessao } = useParams();
    const [sessao, setSessao] = useState([]);
    const [selecao, setSelecao] = useState([]);
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');

    useEffect(() => {
        const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v3/cineflex/showtimes/${idSessao}/seats`);
        promise.then((resp) => {
            setSessao(resp.data.seats);
        });
    }, [idSessao]);

    return (
        <>
            <h1>Selecione o(s) assento(s)</h1>
            <ul className="assentos">
            {sessao.map((assento, index) => (
                <Assento 
                key={index}
                id={assento.id}
                disponibilidade={assento.isAvailable}
                numeroAssento={assento.name}
                selecao={selecao}
                setSelecao={setSelecao}
                />
            ))}
            </ul>
            <Legenda />
            <InfosComprador 
            nome={nome}
            cpf={cpf}
            setNome={setNome}
            setCpf={setCpf}
            />
            <div className="centralizar-botao">
                <button>Reservar assento(s)</button>
            </div>
        </>
    );
}

function Assento({ id, disponibilidade, numeroAssento, selecao, setSelecao }) {

    const [selecionado, setSelecionado] = useState('');
    

    function selecionarAssento() {
        if (!disponibilidade) {
            alert('Esse assento não está disponível')
        } else if (selecionado === '') {
            setSelecionado('selecionado');
            setSelecao([...selecao, numeroAssento]);
        } else {
            setSelecionado('');
            let desmarcado = (selecao.indexOf(numeroAssento));
            selecao.splice(desmarcado, 1);
            setSelecao([...selecao])
        }
    }

    return (
        <li key={id} onClick={selecionarAssento} className={disponibilidade ? selecionado : 'indisponivel'}>{(numeroAssento).padStart(2, '0')}</li>
    );
}

function Legenda() {
    return (
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
    );
}

function InfosComprador({ nome, cpf, setNome, setCpf }) {
    return (
        <div className="infos-comprador">
            <h2 className="dados-comprador">Nome do comprador:</h2>
            <input type="text" placeholder="Digite seu nome..." value={nome} onChange={e => setNome(e.target.value)}></input>
            <h2 className="dados-comprador">CPF do comprador</h2>
            <input type="text" placeholder="Digite seu CPF..." value={cpf} onChange={e => setCpf(e.target.value)}></input>
        </div>
    );
}