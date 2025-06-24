import estilo from './Cabecalho.module.css';

export function Cabecalho() {
    return (
        <header className={estilo.conteiner_header}>
            <h1 className={estilo.linear_gradient_in_text}>
                PokeDex 
            </h1>
        </header>

    )

}