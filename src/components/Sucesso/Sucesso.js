import "./Sucesso.css";
import { Link, useLocation } from "react-router-dom";

export default function Sucesso(props) {

    const location = useLocation();
    props = location.state;

    return (
        <main>
            <h1 className="sucesso">Pedido feito com sucesso!</h1>

            <h1 className="confirmacao">Filme e Sessão</h1>
            <h2 className="dados-confirmacao">{props.nomeFilme}</h2>
            <h2 className="dados-confirmacao">{props.diaMes} - {props.horario}</h2>

            <h1 className="confirmacao">Ingresso</h1>
            {props.selecao.map((assento) => (
                <h2 className="dados-confirmacao">Assento {assento.padStart(2, '0')}</h2>
            ))}

            <h1 className="confirmacao">Comprador</h1>
            <h2 className="dados-confirmacao">{props.nome}</h2>
            <h2 className="dados-confirmacao">CPF: {props.cpf}</h2>

            <Link to="/" style={{textDecoration: 'none'}}>
                <div className="centralizar-botao">
                    <button className="voltar-home">Voltar para Home</button>
                </div>
            </Link>
        </main> 
    );
}