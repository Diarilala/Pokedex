import { useEffect, useState } from 'react'
import './App.css'
import PokemonSprite from './components/PokemonSprite';
import PokemonList from './components/PokemonList';
import PokeSearch from "./components/SearchPokemon.jsx";
import RightPanel from './components/RightPanel.jsx';
import Controls from './components/Controls.jsx';
import PokemonListed from './components/PokemonList';


function App() {
  const [list, setList] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState("");
  const [researchedPokemon , setResearchedPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [rotation, setRotation] = useState(0);


  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredList(list);
    } else {
      const filtered = list.filter(name =>
          name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredList(filtered);
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
  
  // Handle navigation
  const handleUp = () => {
    if (selectedIndex > 0) {
      const newIndex = selectedIndex - 1;
      setSelectedIndex(newIndex);
      setSelectedPokemon(pokemonList[newIndex]);
      setRotation(prev => prev - 60);
    }
  };

  const handleDown = () => {
    if (selectedIndex < pokemonList.length - 1) {
      const newIndex = selectedIndex + 1;
      setSelectedIndex(newIndex);
      setSelectedPokemon(pokemonList[newIndex]);
      setRotation(prev => prev + 60);
    }
  };

  //This is the logic behind showing the researched pokemons

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
  return (

    <div className='w-[22rem] h-[82vh] bg-white rounded-4xl'>
      <header className='w-full bg-amber-500 border-b-2 border-cyan-800 rounded-[15px_15px_0_0]'>
        <div className='flex'>
          <h2 className='font-micro font-bold
          my-1 ml-3 
          text-2xl 
          rounded-xl
           bg-orange-300 
           text-white px-4 border-2 text-shadow-black text-shadow-sm
            border-cyan-800'><b className='font-extrabold'>POKEDEX NATIONAL</b></h2>
        </div>
      </header>

      <main className='bg-blue-100 h-full w-full rounded-[0_0_20px_20px] items-center justify-center'>
        <div className='flex h-[33%] w-full  items-center bg-linear-to-t
         from-indigo-400
          via-indigo-700
           to-indigo-400 gap-2'>
          <div  className='ml-3 w-[43%] aspect-square rounded-2xl overflow-hidden border-4
           border-cyan-800 flex justify-center p-1 bg-yellow-200'>
            <div id='pokemonSpriteDisplay' className='w-[100%] aspect-square rounded-xl overflow-hidden border-4
           border-indigo-300 flex justify-center'>
              <PokemonSprite 
              pokemonId={selectedPokemon.id}/>
            </div>
          </div>
          <div className='List_part overflow-y-hidden'>
            <RightPanel
            pokemonList={pokemonList}
            selectedIndex={selectedIndex}/>
            {/* <PokemonList /> */}
          </div>
          <div className='bg-cyan-400 h-full'>
              <h1>

              </h1>
          </div>
        </div>
        <div className='flex bg-amber-500'></div>

        <div className='flex flex-col overflow-hidden h-[67%] w-full bg-yellow-100 
        justify-between rounded-[0_0_20px_20px] items-center'>
          <div>
          <Controls 
          onUp={handleUp}
          onDown={handleDown}/>

          </div>
          <div className=''>
            <img src="src\assets\pokeballo.png" alt="" className='h-80 ml-45 transition-all'
            style={{transform:`rotate(${rotation}deg)`}}/>
          </div>
            <PokemonListed />
        </div>
      </main>


    </div>
  )
}

export default App

