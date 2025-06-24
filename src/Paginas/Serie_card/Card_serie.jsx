import estilo from './Card_serie.module.css';
import { motion } from 'framer-motion'


export function Card_serie({ serie, onOpenModal_serie }) {
    return (
        <motion.div 
            initial = {{ opacity: 0, scale: 0.95}}
            animate = {{ opacity: 1, scale: 1}}
            transition = {{ duration: 0.5 }}
            className={estilo.conteiner}
        >
            <div className={estilo.imagem}>
                <img
                    className={estilo.img_card}
                    src={`http://image.tmdb.org/t/p/w500/${serie.poster_path}`}
                    onClick={() => onOpenModal_serie(serie)}
                />
            </div>
            <div>
    
            </div>
            {/* <div className={estilo.genre_movies}>
                <h3>
                    {movie.genre_names.map((genre, index) => (
                        <span key={index} className={estilo.genre}>{genre}</span>
                    ))}
                </h3>
            </div> */}
        </motion.div>
    );
}
