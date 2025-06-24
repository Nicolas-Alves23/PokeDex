import style from './Serie.module.css';
import { Lista_serie } from './Serie_card/Lista_serie'


export function Serie(){
    return(
        <main className={style.conteiner}>
            <Lista_serie/>
        </main>
    )
}