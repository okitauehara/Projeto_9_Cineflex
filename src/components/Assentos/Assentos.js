import "./Assentos.css";

export default function Assentos() {
    return (
        <>
            <h1>Selecione o(s) assento(s)</h1>
            <ul className="assentos">
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
                <li className="assento">01</li>
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