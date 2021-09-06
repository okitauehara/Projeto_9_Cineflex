import "./Assentos.css";
import Rodape from "../../shared/Rodape/Rodape";
import Loading from "../../shared/Loading/Loading";
import VoltarPagina from "../../shared/Voltar_Página/VoltarPagina";

import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'

export default function Assentos() {

    const { idFilme } = useParams();
    const { idSessao } = useParams();
    const history = useHistory();
    
    const [sessao, setSessao] = useState([]);
    const [filme, setFilme] = useState([]);
    const [dia, setDia] = useState([]);
    const [horario, setHorario] = useState([]);
    const [selecaoId, setSelecaoId] = useState([]);
    const [selecaoNome, setSelecaoNome] = useState([]);
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
                        idAssento={assento.id}
                        disponibilidade={assento.isAvailable}
                        nomeAssento={assento.name}
                        selecaoId={selecaoId}
                        selecaoNome={selecaoNome}
                        setSelecaoId={setSelecaoId}
                        setSelecaoNome={setSelecaoNome}
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
                    selecaoId={selecaoId}
                    selecaoNome={selecaoNome}
                    nome={nome}
                    cpf={cpf}
                    idFilme={idFilme}
                    idSessao={idSessao}
                    nomeFilme={filme.title}
                    horario={horario}
                    diaMes={dia.date}
                    history={history}
                    />
                <Rodape
                    filme={filme}
                    dia={dia}
                    />
            </main>
        );
    }
}

function Assento({ idAssento, disponibilidade, nomeAssento, selecaoId, selecaoNome, setSelecaoId, setSelecaoNome }) {

    const [selecionado, setSelecionado] = useState('');
    

    function selecionarAssento() {
        if (!disponibilidade) {
            Swal.fire({
                icon: 'error',
                title: 'Ops...',
                text: 'Esse assento não está disponível',
              })
        } else if (selecionado === '') {
            setSelecionado('selecionado');
            setSelecaoId([...selecaoId, idAssento]);
            setSelecaoNome([...selecaoNome, nomeAssento])
        } else {
            setSelecionado('');
            let desmarcadoId = (selecaoId.indexOf(idAssento));
            let desmarcadoNome= (selecaoNome.indexOf(nomeAssento));
            selecaoId.splice(desmarcadoId, 1);
            selecaoNome.splice(desmarcadoNome, 1);
            setSelecaoId([...selecaoId])
            setSelecaoNome([...selecaoNome])
        }
    }

    return (
        <li key={idAssento} onClick={selecionarAssento} className={disponibilidade ? selecionado : 'indisponivel'}>{(nomeAssento).padStart(2, '0')}</li>
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

function Reservar({ selecaoId, selecaoNome, nome, cpf, idFilme, idSessao, horario, nomeFilme, diaMes, history }) {

    const reserva = {
        ids: selecaoId,
        name: nome,
        cpf: cpf
    };
 

    function confirmarReserva() {
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v3/cineflex/seats/book-many", reserva);
        promise.then(() => (history.push({pathname: `/sessoes/${idFilme}/assentos/${idSessao}/sucesso`, state: {selecaoNome: selecaoNome, nome: nome, cpf: cpf, nomeFilme: nomeFilme, horario: horario, diaMes: diaMes}})));
        promise.catch((erro) => alert(erro));
    }

    return (
        <div className="centralizar-botao">
            <button onClick={confirmarReserva} className={(selecaoId.length !== 0 && !!nome && !!cpf) ? 'reservar ativado' : 'reservar'}>Reservar assento(s)</button>
        </div>
    );
}

