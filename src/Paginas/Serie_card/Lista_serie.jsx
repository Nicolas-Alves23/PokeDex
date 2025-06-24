import { useState, useEffect } from "react";
import { Loading } from "../../Componentes/Loading";
import { Card_serie } from "./Card_serie";
import { Modal_serie } from "./Modal_serie";
import axios, { all } from "axios";
import style from "./Lista_serie.module.css";

const API_URL = 'https://api.themoviedb.org/3';
const API_key = 'af26cce282aecf5c6cc39a264f29d0a7';

export function Lista_serie() {
  const [serie, setSeries] = useState([]);
  const [selectedSerie, setSelectedSerie] = useState(null);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [timerDone, setTimerDone] = useState(false);

  useEffect(() => {
    // Tempo fixo de loading (3 segundos)
    const timer = setTimeout(() => {
      setTimerDone(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        // pegando as séries (5 page's)
        // um código quase que identico do arquivo 'Lista.jsx'
        const pageNumbers = [1, 2, 3, 4, 5]; 

        const requests = pageNumbers.map((page) =>
          axios.get(`${API_URL}/tv/popular?api_key=${API_key}&language=pt-BR&page=${page}`)
        );

        const responses = await Promise.all(requests);
        const allSeries = responses.flatMap(response => response.data.results);

        const serieWithPoster = allSeries.filter(
          serie => serie.poster_path && serie.poster_path.trim() !== ""
        );

        console.log(allSeries);
        // Remover duplicatas
        const uniqueSeries = Array.from(new Map(serieWithPoster.map(serie => [serie.id, serie])).values());

        setSeries(uniqueSeries);
      } catch (error) {
        console.error('Erro ao carregar séries:', error);
      } finally {
        setApiLoaded(true);
      }
    };

    fetchSeries();
  }, []);

  const handleOpenModal_serie = (serie) => {
    setSelectedSerie(serie);
  };

  const handleCloseModal_serie = () => {
    setSelectedSerie(null);
  };

  if (!apiLoaded || !timerDone) {
    return <Loading />;
  }

  return (
    <div className={style.container}>
      <figure>
        {serie.map((serie) => (
          <Card_serie
            key={serie.id}
            serie={serie}
            onOpenModal_serie={handleOpenModal_serie}
          />
        ))}
      </figure>

      {selectedSerie && (
        <Modal_serie serie={selectedSerie} onClose={handleCloseModal_serie} />
      )}
    </div>
  );
}
