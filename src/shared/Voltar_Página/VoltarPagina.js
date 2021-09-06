import './VoltarPagina.css'
import { IoChevronBackCircleSharp } from "react-icons/io5"
import { useHistory } from 'react-router';

export default function VoltarPagina(props) {

    const history = useHistory();

    return (
        <IoChevronBackCircleSharp className="voltar" onClick={() => history.push(props.caminho)}/>
    );
}