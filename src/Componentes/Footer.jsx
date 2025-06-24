import { footer } from 'framer-motion/client'
import style from './Footer.module.css'

export function Footer(){

    return(
        <footer className={style.footer_all_pages}>
            <h5>© Nicolas Vilela, Todos os Direitos Reservados </h5>
        </footer>
    );

}