import "./Sucesso.css";

export default function Sucesso() {
    return (
        <>
            <h1 className="sucesso">Pedido feito com sucesso!</h1>

            <h1 className="confirmacao">Filme e Sessão</h1>
            <h2 className="dados-confirmacao">Enola Holmes</h2>
            <h2 className="dados-confirmacao">24/06/2021 - 15:00</h2>

            <h1 className="confirmacao">Ingresso</h1>
            <h2 className="dados-confirmacao">Assento 15</h2>
            <h2 className="dados-confirmacao">Assento 16</h2>

            <h1 className="confirmacao">Comprador</h1>
            <h2 className="dados-confirmacao">Nome: João da Silva Sauro</h2>
            <h2 className="dados-confirmacao">CPF: 123.456.789-10</h2>

            <div className="centralizar-botao home">
                <button>Voltar para Home</button>
            </div>
        </> 
    );
}