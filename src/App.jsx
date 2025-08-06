import { useEffect, useState } from 'react'
import './App.css'
import PokemonSprite from './components/PokemonSprite';
import PokemonList from './components/PokemonList';
import PokemonScroll from "./components/PokemonScroll.jsx";
import PokeSearch from "./components/SearchPokemon.jsx";


function App() {
  const [list, setList] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState("");
  const [researchedPokemon , setResearchedPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  //const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);


  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredList(list);
      setSelectedIndex(0);
    } else {
      const filtered = list.filter(name =>
          name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredList(filtered);
      setSelectedIndex(0);
    }
  }, [searchTerm, list]);

  //fetching pokemon
  useEffect(() => {
    const fetching = async () => {
      try {
        const reponse = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1302");
        const data = await reponse.json();

        const pokemonWithIds = data.results.map((pokemon, index) => ({
          ...pokemon,
          id: index + 1
        }));

        setPokemonList(pokemonWithIds);
        setSelectedPokemon(pokemonWithIds[0]);
        setLoading(false);

      } catch (error) {
        console.log("Error fetching Pokemon:", error);
        setLoading(false);
      }
    };

    fetching();
  }, []);




  useEffect(() => {
        const newPokemons = pokemonList.filter((pokemon) => pokemon.name.toLowerCase().includes(searchParams.toLowerCase()));
        setResearchedPokemon(newPokemons.slice(0,150))
    } , [searchParams, pokemonList])


  if (loading) {
  return (
    <div>
      <div></div>
      <p>Loading Pokedex...</p>
    </div>
  )
  }

  const handleNext = () => {
    if (filteredList.length > 0) {
      setSelectedIndex(prev => (prev + 1) % filteredList.length);
    }
  };

  const handlePrev = () => {
    if (filteredList.length > 0) {
      setSelectedIndex(prev => (prev - 1 + filteredList.length) % filteredList.length);
    }
  };
  return (

    <div className='w-sm h-[88vh] bg-white'>
      <header className='w-full bg-amber-500 border-b-2 border-cyan-800'>
        <div className='flex'>
          <h2 className='font-micro font-bold
          my-1 ml-3
          text-2xl
          rounded-xl
           bg-orange-300
           text-white px-4 border-2 text-shadow-black text-shadow-sm
            border-cyan-800'><b>POKEDEX NATIONAL</b></h2>
        </div>
      </header>

      <main className='bg-blue-100 h-full w-full'>
        <div className='flex gap-2 h-[35%] w-full  items-center bg-linear-to-t
         from-indigo-400
          via-indigo-700
           to-indigo-400'>
          <div  className='ml-3 w-[43%] aspect-square rounded-2xl overflow-hidden border-4
           border-cyan-800 flex justify-center p-1 bg-yellow-200'>
            <div id='pokemonSpriteDisplay' className='w-[100%] aspect-square rounded-xl overflow-hidden border-4
           border-indigo-300 flex justify-center'>
              <PokemonSprite />
            </div>
          </div>
          <div className='List_part h-[75%] overflow-y-hidden pl-5'>

          </div>
          <div className='bg-cyan-400 h-full'>
              <h1>

              </h1>
          </div>
        </div>
        <div className='flex h-[10%] bg-green-100'></div>

        <div className='flex h-[50%] overflow-y-hidden w-[100%] bg-amber-800'>
          <section className='m-5 items-center overflow-y-auto'>
            <PokemonList />
          </section>


        </div>
      </main>


    </div>
  )
}

export default App

