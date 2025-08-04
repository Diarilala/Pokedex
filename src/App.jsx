import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'


function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState([true]);

  //fetching pokemon
  useEffect(() => {
    const fetching = async () => {
      try {
        const reponse = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        const data = await fetchedData.json();
        pokemonWithIds = jsonVersion.map((pokemon, index) => ({
          ...pokemon,
          id: index + 1
        }));
        setLoading(false);
        setPokemonList(pokemonWithIds);
      } catch (error) {
        console.log("Error fetching Pokemon:", error);
        setLoading(false);
      }
    };

    fetching();
  }, []);
  
function display(){
  console.log(pokemonList)
}
display();

  return (
    <div className='w-sm h-[90vh] bg-white'>
      <header className='w-full h-fit bg-amber-500 border-b-1 border-black'>
        <div className='flex'>
          <h2 className='font-VT my-1 ml-2 text-xl rounded-xl bg-orange-300 text-white px-4 border-1 border-black mb- '><b>POKEDEX NATIONAL</b></h2>
        </div>
      </header>
    </div>
  )
}

export default App
