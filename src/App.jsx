import { useEffect, useState } from 'react'
import './App.css'
import PokemonSprite from './components/PokemonSprite';
import PokemonList from './components/PokemonList';
import PokemonScroll from "./components/PokemonScroll.jsx";


function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);


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
  
  /*

  This is the logic behind showing the researched pokemons

  useEffect(() => {
        const newPokemons = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(searchParams.toLowerCase()));
        setResearchedPokemon(newPokemons.slice(0,150))
    } , [searchParams, pokemonList])
  
    */
  if (loading) {
  return (
    <div>
      <div></div>
      <p>Loading Pokedex...</p>
    </div>
  )
  }
  return (
  /*
    This is the search bar functonality maybe you will need this for your scroll
    .... or not XD

    input type="text"
                placeholder="Enter a pokemon name ..." 
                onChange={(e) => onSearch(e.target.value)}
                className="w-1/3 border-2 rounded-2xl p-2 text-center"
        />

  */

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

            <PokemonList />
          </div>
          <div className='bg-cyan-400 h-full'>
              <h1>

              </h1>
          </div>
        </div>
        <div className='flex h-[10%] bg-green-100'></div>

        <div className='flex h-[50%] w-full bg-amber-800'>
          <PokemonScroll />
        </div>
      </main>


    </div>
  )
}

export default App

