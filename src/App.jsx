import { useEffect, useState } from 'react'
import './App.css'
import PokemonSprite from './components/PokemonSprite';

function App() {
  const [spriteUrl, setSpriteUrl] = useState('');

  //fetching pokemon
  useEffect(() => {
    const fetching = async () => {
      try {
        const reponse = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        const data = await reponse.json();
        const firstPokemonUrl = data.results[0].url;
        const fetchPokemon = await fetch(firstPokemonUrl);
        const fetchData = await fetchPokemon.json();
    
        setSpriteUrl(fetchData.sprites.front_default);
      } catch (error) {
        console.log("Error fetching Pokemon:", error);
      }
    };

    fetching();
  }, []);
  
  return (
    <div className='w-sm h-[88vh] bg-white'>
      <header className='w-full h-fit bg-amber-500 border-b-2 border-cyan-800'>
        <div className='flex'>
          <h2 className='font-VT 
          my-1 ml-3 
          text-xl 
          rounded-xl
           bg-orange-300 
           text-white px-4 border-2 text-shadow-black text-shadow-sm
            border-cyan-800'><b>POKEDEX NATIONAL</b></h2>
        </div>
      </header>
      <main className='bg-blue-100 h-full w-full'>
        <div className='flex gap-2 h-[35%] w-full items-center bg-linear-to-t
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
          <div className='bg-cyan-400 h-full'>

          </div>
        </div>
        <div className='flex h-[10%] bg-green-100'></div>
        <div className='flex h-[50%] w-full bg-amber-800'></div>
      </main>
    </div>
  )
}

export default App

