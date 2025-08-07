import { useEffect, useState } from "react";
import '../App.css'
import PokeSearch from "./SearchPokemon.jsx";
import PokemonScroll from "./PokemonScroll";

export default function PokemonListed(selectedPokemon) {
    const [list, setList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

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

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredList(list);
            setSelectedIndex(0); // Reset selection when search is cleared
        } else {
            const filtered = list.filter(name =>
                name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredList(filtered);
            setSelectedIndex(0); // Reset selection when search changes
        }
    }, [searchTerm, list]);

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
        <div className=''>
            <PokeSearch onSearch={setSearchTerm} />
            <ul className="p-0 m-0">
                {filteredList.map((name, index) => (
                    <button
                        key={index}
                        className={`font-micro gap-1 text-lg p-0 m-0 w-[80%] flex h-6 hover:bg-[#fefec3] hover:scale-110 text-blue-950 rounded-l-2xl rounded-r-xs my-2 
                            ${index === selectedIndex ? 'bg-[#fefec3] scale-110' : 'bg-[#cec5b9]'}`}
                        onClick={() => setSelectedIndex(index)}
                    >
                        <img src='src/assets/pokeball.png' alt={'pokeball'} className='w-fit h-[100%] ml-[0.25px]'/>
                        <li className='flex items-center h-[100%] w-full'>
                            {name}
                        </li>
                    </button>
                ))}
            </ul>
            <PokemonScroll
                onNext={handleNext}
                onPrev={handlePrev}
                currentIndex={selectedIndex}
                totalItems={filteredList.length}
            />
        </div>
    )
}