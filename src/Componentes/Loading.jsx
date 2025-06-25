import { useState, useEffect } from 'react'; // Hook para gerenciar estado e efeitos colaterais
import loading from '../img/loading.svg'; // Imagem SVG de carregamento
import styles from './Loading.module.css'; // Estilo CSS module

export function Loading() {
    const [showImg, setShowImg] = useState(true); // Controla se a imagem será exibida

    // Efeito que troca a imagem por texto após 3 segundos
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowImg(false); // Após 3 segundos, mostra o texto
        }, 3000);

        return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
    }, []);

    return (
        <div className={styles.loadingContainer}>
            {showImg ? (
                <img src={loading} alt="Carregando..." />
                // Enquanto showImg for true, mostra o SVG de loading
            ) : (
                <h3>Espere um pouco</h3>
                // Após 3 segundos, exibe essa mensagem
            )}
        </div>
    );
}
