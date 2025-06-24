import estilo from './Card.module.css';
import { motion } from 'framer-motion'


export function Card({ pokemon, onOpenModal }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={estilo.conteiner}
        >
            <div className={estilo.center_plis}>
                <div className={estilo.imagem}>
                    <img src={pokemon.image} alt="Pokemon" className={estilo.imagem_jpg} />
                    <h1 className={estilo.nome_pokemon}>{pokemon.name}</h1>
                </div>
            </div>
        </motion.div>
    );
}
