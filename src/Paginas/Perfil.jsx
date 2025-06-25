import style from "./Perfil.module.css";
import { motion } from "framer-motion";


export function Perfil() {
	return (
		<main className={style.conteiner_main_perfil}>
			<motion.div
				className={style.efeito_div}
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
			>
			</motion.div>
		</main>
	);
}
