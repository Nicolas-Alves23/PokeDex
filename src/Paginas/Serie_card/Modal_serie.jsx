import style from './Modal_serie.module.css';

export function Modal_serie({ serie, onClose }) {
    if (!serie) {
        return null;
    }

    return (
        <div className={style.modalback}>
            <div className={style.modalConteiner}>
                <div className={style.modalheader}>
                    <button onClick={onClose}>X</button>
                </div>
                <div>
                    <div>
                        <img
                            src={`http://image.tmdb.org/t/p/w500/${serie.poster_path}`}
                        />
                        
                    </div>
                </div>
                <div className={style.numbers_about_film}>
                    <div className={style.text_in_modal}>
                        <h2>Opinião do Pública</h2>
                        <p className={style.numbers}>{serie.vote_average}</p>
                    </div>
                    <div className={style.text_in_modal}>
                        <h2>Quantidade de Votos</h2>
                        <p className={style.numbers}>{serie.vote_count}</p>
                    </div>
                    <div className={style.text_in_modal}>
                        <h2>Popularidade</h2>
                        <p className={style.numbers}>{serie.popularity}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
