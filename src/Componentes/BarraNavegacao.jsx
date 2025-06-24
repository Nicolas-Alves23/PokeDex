import { Link } from 'react-router-dom';
import estilo from './BarraNavegacao.module.css';

//estrura para o componente React
export function BarraNavegacao(){
    //todo retorno só pode renderizar um componente
    return(
        <nav className={estilo.conteiner}>
            <ul>
                <Link to='/'>
                <li>
                    <span className="material-symbols-outlined">home</span>
                    Home
                </li>
                </Link>

            </ul>
        </nav>
    )
}