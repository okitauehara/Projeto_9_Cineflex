import "./Assentos.css";
import Loading from "../Loading/Loading";
import VoltarPagina from "../Voltar_Página/VoltarPagina";

import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

export default function Assentos() {

    const { idFilme } = useParams();
    const { idSessao } = useParams();
    const history = useHistory();
    const [sessao, setSessao] = useState([]);
    const [filme, setFilme] = useState([]);
    const [dia, setDia] = useState([]);
    const [horario, setHorario] = useState([]);
    const [selecao, setSelecao] = useState([]);
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');

    useEffect(() => {
        const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v3/cineflex/showtimes/${idSessao}/seats`);
        promise.then((resp) => {
            setSessao(resp.data.seats);
            setFilme(resp.data.movie)
            setDia(resp.data.day);
            setHorario(resp.data.name);
        });
    }, [idSessao]);

    if (sessao.length === 0) {
        return <Loading />
    } else {
        return (
            <main>
                <h1>Selecione o(s) assento(s)</h1>
                <VoltarPagina caminho={`/sessoes/${idFilme}`}/>
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
                <Reservar
                    selecao={selecao}
                    nome={nome}
                    cpf={cpf}
                    idFilme={idFilme}
                    idSessao={idSessao}
                    nomeFilme={filme.title}
                    horario={horario}
                    diaMes={dia.date}
                    history={history}
                    />
                <footer>
                    <div className="rodape">
                        <img className="imagem-rodape" src={filme.posterURL} alt={filme.title} />
                        <div className="detalhes-filme">
                            <span className="infos-rodape">{filme.title}</span>
                            <span className="infos-rodape">{dia.weekday} - {dia.date}</span>
                        </div>
                    </div>
                </footer>
            </main>
        );
    }
}

function Assento({ id, disponibilidade, numeroAssento, selecao, setSelecao }) {

    const [selecionado, setSelecionado] = useState('');
    

    function selecionarAssento() {
        if (!disponibilidade) {
            alert('Esse assento não está disponível');
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

function Reservar({ selecao, nome, cpf, idFilme, idSessao, horario, nomeFilme, diaMes, history }) {

    const reserva = {
        ids: selecao,
        name: nome,
        cpf: cpf
    };
 

    function confirmarReserva() {
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v3/cineflex/seats/book-many", reserva);
        promise.then(history.push({pathname: `/sessoes/${idFilme}/assentos/${idSessao}/sucesso`, state: {selecao: selecao, nome: nome, cpf: cpf, nomeFilme: nomeFilme, horario: horario, diaMes: diaMes}}));
        promise.catch((erro) => alert(erro));
    }

    console.log(reserva)

    return (
        <div className="centralizar-botao">
            <button onClick={confirmarReserva} className={(selecao.length !== 0 && !!nome && !!cpf) ? 'reservar ativado' : 'reservar'}>Reservar assento(s)</button>
        </div>
    );
}

