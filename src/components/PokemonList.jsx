import { useEffect, useState } from "react";
import '../App.css'

export default function PokemonList() {
    const [list, setList] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPokemonList() {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=2000');
                const data = await response.json();
                const names = data.results.map(pokemon => pokemon.name);
                setList(names);
                setError(null)
            } catch (error) {
                setError('Failed to load pokemon list');
                console.error(error);
            } finally {
                setloading(false);
            }
        }
        fetchPokemonList();
    }, []);

    if (loading) return <div>Loading pokemon...</div>;
  if (error) return <div>{error}</div>;

    return (
        <div>


                <ul className="p-0 m-0  ">
                    {list.map((name, index) => (
                        <button className='font-VT text-lg p-0 m-0 w-[80%] bg-[#cec5b9] flex gap-0 h-6 items-center transition-discrete hover:bg-[#fefec3] hover:scale-110 text-red-500 rounded-l-2xl rounded-r-xs  my-2'>

                                <img src='src/assets/pokeball.png' alt={'pokeball'} className='w-fit h-[100%]'/>
                            <li key={index} className='flex items-center p-0 m-0'>
                                {name}
                            </li>
                        </button>  // Fixed: Proper list rendering
        ))}
                </ul>

        </div>
    )
}