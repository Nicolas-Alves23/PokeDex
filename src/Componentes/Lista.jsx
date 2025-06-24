import { useState, useEffect } from "react";
import { Loading } from "./Loading";
import { Card } from "./Card";
import { Modal } from "./Modal";
import axios from "axios";
import style from "./Lista.module.css";

const API_URL = 'https://pokeapi.co/api/v2/';
const API_key = 'af26cce282aecf5c6cc39a264f29d0a7';

export function Lista() {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const [apiLoaded, setApiLoaded] = useState(false); // API carregada
  const [timerDone, setTimerDone] = useState(false); // Tempo mínimo de loading concluído

  useEffect(() => {
    // Tempo fixo de loading (3 segundos)
    const timer = setTimeout(() => {
      setTimerDone(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

useEffect(() => {
  const fetchpokemons = async () => {
    try {
      // Passo 1: Buscar lista dos primeiros 120 pokémons
      const response = await axios.get(`${API_URL}pokemon?limit=120`);
      const results = response.data.results; // [{ name, url }]

      // Passo 2: Buscar detalhes de cada pokémon individualmente
      const pokemonDetails = await Promise.all(
        results.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          return {
            id: res.data.id,
            name: res.data.name,
            image: res.data.sprites.front_default,
            types: res.data.types.map(t => t.type.name),
            stats: res.data.stats,
          };
        })
      );

      setPokemons(pokemonDetails);
    } catch (error) {
      console.log('Erro ao carregar pokémons', error);
    } finally {
      setApiLoaded(true);
    }
  };

  fetchpokemons();
}, []);

  const handleOpenModal = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleCloseModal = () => {
    setSelectedPokemon(null);
  };

  // Enquanto a API não carregou ou o timer não terminou, mostra o Loading
  if (!apiLoaded || !timerDone) {
    return <Loading />;
  }

  return (
    <div className={style.container}>
      <figure>
        {pokemons.map((pokemon) => (
          <Card
            key={pokemon.id}
            pokemon={pokemon}
            onOpenModal={handleOpenModal}
          />
        ))}
      </figure>

      {selectedPokemon && (
        <Modal pokemon={selectedPokemon} onClose={handleCloseModal} />
      )}
    </div>
  );
}
