import { useState, useEffect } from "react";
import { Loading } from "./Loading";
import { Card } from "./Card";
import axios from "axios";
import style from "./Lista.module.css";

const API_URL = 'https://pokeapi.co/api/v2/';

export function Lista() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('todos');

  const [apiLoaded, setApiLoaded] = useState(false);
  const [timerDone, setTimerDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimerDone(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchpokemons = async () => {
      try {
        const response = await axios.get(`${API_URL}pokemon?limit=120`);
        const results = response.data.results;

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
        setFilteredPokemons(pokemonDetails);

        const allTypes = new Set();
        pokemonDetails.forEach(p => p.types.forEach(t => allTypes.add(t)));
        setTypes(['todos', ...Array.from(allTypes)]);
      } catch (error) {
        console.log('Erro ao carregar pokémons', error);
      } finally {
        setApiLoaded(true);
      }
    };

    fetchpokemons();
  }, []);

  useEffect(() => {
    let filtered = pokemons;

    if (selectedType !== 'todos') {
      filtered = filtered.filter(pokemon =>
        pokemon.types.includes(selectedType)
      );
    }

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPokemons(filtered);
  }, [searchTerm, selectedType, pokemons]);

  if (!apiLoaded || !timerDone) {
    return <Loading />;
  }

  return (
    <main className={style.conteine}>
      <div className={style.filtros}>
        <input
          type="text"
          placeholder="Buscar por nome"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          {types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <figure>
        {filteredPokemons.map((pokemon) => (
          <Card
            key={pokemon.id}
            pokemon={pokemon}
          />
        ))}
      </figure>
    </main>
  );
}
