import { useEffect, useState } from "react";
import '../App.css'
import PokeSearch from "./SearchPokemon.jsx";
import PokemonScroll from "./PokemonScroll";

export default function PokemonList() {
    const [list, setList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
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

    useEffect(() => {
        async function fetchPokemonList() {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=2000');
                const data = await response.json();
                const names = data.results.map(pokemon => pokemon.name);
                setList(names);
                setFilteredList(names);
                setError(null);
            } catch (error) {
                setError('Failed to load pokemon list');
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchPokemonList();
    }, []);




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

    if (loading) return <div>Loading pokemon...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="pokemon-list flex">
        <section className='m-0 p-0'>
            <PokeSearch onSearch={setSearchTerm} />
            <ul className="p-0 m-0">
                {filteredList.map((name, index) => (
                    <button
                        key={index}
                        className={`font-micro gap-1 text-lg p-0 m-0 w-[100%] flex h-5 hover:bg-[#fefec3] hover:scale-110 text-blue-950 rounded-l-2xl rounded-r-xs my-2 
                            ${index === selectedIndex ? 'bg-[#fefec3] scale-110' : 'bg-[#cec5b9]'}`}
                        onClick={() => setSelectedIndex(index)}
                    >
                        <img src='src/assets/pokeball.png' alt={'pokeball'} className='w-fit h-[100%] pl-[2px]'/>
                        <li className='flex items-center'>
                            {name}
                        </li>
                    </button>
                ))}
            </ul>
        </section>
            <section className='m-0 p-0 overflow-x-hidden'>
                <PokemonScroll
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
            </section>
        </div>
    )
}