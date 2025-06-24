import style from "./Perfil.module.css";
import foto from "../img/perfil_person.png";
import { motion } from "framer-motion";

export function Perfil() {
	return (
		<main className={style.conteiner_main_perfil}>
			<motion.div
                className={style.efeito_div}
								initial = {{ opacity: 0, scale: 0.95}}
								animate = {{ opacity: 1, scale: 1}}
								transition = {{ duration: 0.5 }}
            >
				<div className={style.ft_perfil}>
					<img
						src={foto}
						alt="área na onde vai estar o avatar ou a foto de perfil do usuário"
					/>
				</div >
				<div className={style.text_name_user_and_about}>
					<h1>Nicolas Vilela Barros</h1>
					
				</div>
			</motion.div>
		</main>
	);
}
