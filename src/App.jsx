import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import rotate from './components/rotate';
import pokemonDisplay from './components/SpriteDisplay';


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
      <header className='w-full h-fit bg-amber-500 border-b-1 border-black'>
        <div className='flex'>
          <h2 className='font-VT my-1 ml-2 text-xl rounded-xl bg-orange-300 text-white px-4 border-1 border-black mb- '><b>POKEDEX NATIONAL</b></h2>
        </div>
      </header>
      <main className='bg-blue-100 h-full w-full'>
        <div className='flex gap-2 h-[40%] w-full items-center bg-yellow-100'>
          <div className=''>
            <div></div>
          </div>
          <div className=''>

          </div>
        </div>
        <div className='flex h-[10%] bg-green-100'></div>
        <div className='flex h-[50%] w-full bg-amber-800'></div>
      </main>
    </div>
  )
}

export default App

