import { useEffect, useState } from "react";

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
            <h1>
                <ul className="text-lg">
                    {list.map((name, index) => (
          <li key={index}>{name}</li>  // Fixed: Proper list rendering
        ))}
                </ul>
            </h1>
        </div>
    )
}