import { useState, useEffect } from "react";
import { Loading } from "./Loading"; // Componente que exibe um loading enquanto os dados são carregados
import { Card } from "./Card";       // Componente que representa o card de um Pokémon
import axios from "axios";           // Biblioteca para requisições HTTP
import style from "./Lista.module.css"; // Estilos CSS no formato de módulos

const API_URL = 'https://pokeapi.co/api/v2/'; // URL base da API do PokéAPI

export function Lista() {
  // Estados principais da aplicação
  const [pokemons, setPokemons] = useState([]); // Lista completa dos pokémons
  const [filteredPokemons, setFilteredPokemons] = useState([]); // Lista filtrada (após busca/filtro)
  const [types, setTypes] = useState([]); // Tipos únicos de pokémons
  const [searchTerm, setSearchTerm] = useState(''); // Termo de busca por nome
  const [selectedType, setSelectedType] = useState('todos'); // Tipo selecionado no filtro dropdown

  const [apiLoaded, setApiLoaded] = useState(false); // Indica se os dados da API foram carregados
  const [timerDone, setTimerDone] = useState(false); // Controle para garantir que o loading apareça por no mínimo 3 segundos

  // Efeito que ativa um temporizador de 3 segundos para o loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimerDone(true); // Após 3 segundos, libera o timer
    }, 3000);

    return () => clearTimeout(timer); // Limpa o temporizador ao desmontar o componente
  }, []);

  // Efeito que busca os pokémons na API quando o componente é montado
  useEffect(() => {
    const fetchpokemons = async () => {
      try {
        // pegando os primeiros 820 pokemons
        // Requisição inicial para pegar a lista básica dos pokémons
        const response = await axios.get(`${API_URL}pokemon?limit=820`);
        const results = response.data.results;

        // Para cada Pokémon, faz uma requisição para obter os detalhes
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

        setPokemons(pokemonDetails); // Armazena todos os pokémons
        setFilteredPokemons(pokemonDetails); // Inicialmente, todos são exibidos

        // Extrai todos os tipos únicos de pokémon
        const allTypes = new Set();
        pokemonDetails.forEach(p => p.types.forEach(t => allTypes.add(t)));
        setTypes(['todos', ...Array.from(allTypes)]); // Adiciona 'todos' como opção padrão no filtro
      } catch (error) {
        console.log('Erro ao carregar pokémons', error); // Trata erro da API
      } finally {
        setApiLoaded(true); // Marca que o carregamento da API foi concluído
      }
    };

    fetchpokemons(); // Chama a função que faz o fetch
  }, []);

  // Efeito que atualiza a lista filtrada conforme o nome ou tipo selecionado muda
  useEffect(() => {
    let filtered = pokemons;

    // Filtra por tipo, se um tipo específico estiver selecionado
    if (selectedType !== 'todos') {
      filtered = filtered.filter(pokemon =>
        pokemon.types.includes(selectedType)
      );
    }

    // Filtra por nome, se houver termo de busca
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPokemons(filtered); // Atualiza a lista exibida
  }, [searchTerm, selectedType, pokemons]);

  // Enquanto os dados ainda estão sendo carregados ou o timer não completou, exibe o loading
  if (!apiLoaded || !timerDone) {
    return <Loading />;
  }

  // Conteúdo principal do componente
  return (
    <main className={style.conteine}>
      <div className={style.filtros}>
        {/* Campo de busca por nome */}
        <input
          type="text"
          placeholder="Buscar por nome"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        {/* Dropdown de filtro por tipo */}
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          {types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Exibe os cards dos pokémons filtrados */}
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
