import estilo from './Modal.module.css';

export function Modal({ movie, onClose }) {
    if (!movie) {
        return null;
    }

    return (
        <div className={estilo.modalback}>
            <div className={estilo.modalConteiner}>
                <div className={estilo.modalheader}>
                    <button onClick={onClose}>X</button>
                </div>
                <div className={estilo.numbers_about_film}>
                    <div className={estilo.text_in_modal}>
                        <h2>Opinião do Pública</h2>
                        <p className={estilo.numbers}>{movie.vote_average}</p>
                    </div>
                    <div className={estilo.text_in_modal}>
                        <h2>Quantidade de Votos</h2>
                        <p className={estilo.numbers}>{movie.vote_count}</p>
                    </div>
                    <div className={estilo.text_in_modal}>
                        <h2>Popularidade</h2>
                        <p className={estilo.numbers}>{movie.popularity}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
