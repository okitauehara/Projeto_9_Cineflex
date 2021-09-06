import './Rodape.css'

export default function Rodape ({ filme, dia }) {
    if (!dia) {
        return (
            <footer>
                <div className="rodape">
                    <img className="imagem-rodape" src={filme.posterURL} alt={filme.title} />
                    <div className="detalhes-filme">
                        <span className="infos-rodape">{filme.title}</span>
                        <span className="infos-rodape"></span>
                    </div>
                </div>
            </footer>
        );
    } else {
        return (
            <footer>
                <div className="rodape">
                    <img className="imagem-rodape" src={filme.posterURL} alt={filme.title} />
                    <div className="detalhes-filme">
                        <span className="infos-rodape">{filme.title}</span>
                        <span className="infos-rodape">{dia.weekday} - {dia.date}</span>
                    </div>
                </div>
            </footer>
        );
    }
}