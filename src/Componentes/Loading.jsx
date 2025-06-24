import { useState, useEffect } from 'react';
import loading from '../img/loading.svg';
import styles from './Loading.module.css';

export function Loading() {
    const [showImg, setShowImg] = useState(true);

    return (
        <div className={styles.loadingContainer}>
            {showImg ? (
                <img src={loading} alt="Carregando..." />
            ) : (
                <h3>Espere um pouco</h3>
            )}
        </div>
    );
}
