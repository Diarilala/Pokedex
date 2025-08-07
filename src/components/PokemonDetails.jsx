import { useState, useEffect } from 'react';

const typeStyles = {
  // Couleurs pour chaque type
  colors: {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: '#6890F0',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-cyan-300',
    fighting: 'bg-red-700',
    poison: 'bg-purple-600',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-300',
    psychic: 'bg-pink-500',
    bug: 'bg-lime-500',
    rock: 'bg-yellow-700',
    ghost: 'bg-purple-800',
    dragon: 'bg-indigo-700',
    dark: 'bg-gray-800',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300'
  },
  
  // Traductions françaises
  frenchNames: {
    normal: 'Normal',
    fire: 'Feu',
    water: 'Eau',
    electric: 'Électrik',
    grass: 'Plante',
    ice: 'Glace',
    fighting: 'Combat',
    poison: 'Poison',
    ground: 'Sol',
    flying: 'Vol',
    psychic: 'Psy',
    bug: 'Insecte',
    rock: 'Roche',
    ghost: 'Spectre',
    dragon: 'Dragon',
    dark: 'Ténèbres',
    steel: 'Acier',
    fairy: 'Fée'
  }
};

export default function PokemonDetails({ pokemonId }) {
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [speciesData, setSpeciesData] = useState(null);

    useEffect(() => {
        async function fetchPokemonDetails() {
            try {
                setLoading(true);
                // Fetch basic pokemon data
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
                const data = await response.json();
                setPokemonDetails(data);

                // Fetch species data for description
                const speciesResponse = await fetch(data.species.url);
                const speciesData = await speciesResponse.json();
                setSpeciesData(speciesData);

                setError(null);
            } catch (err) {
                setError('Failed to load Pokémon details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchPokemonDetails();
    }, [pokemonId]);

    if (loading) return <div>Loading details...</div>;
    if (error) return <div>{error}</div>;
    if (!pokemonDetails || !speciesData) return <div>No Pokémon selected</div>;

    const frenchEntry = speciesData.flavor_text_entries.find(
        entry => entry.language.name === 'fr'
    );

    return (
        <div className="p-4 bg-red-300 rounded-lg shadow-md font-bold">
            <div className="text-center mb-4">
                <h2 className="text-2xl font-bold uppercase">
                    #{pokemonDetails.id} {
                    speciesData.names.find(n => n.language.name === 'fr')?.name 
                    || pokemonDetails.name
                }
                </h2>
                <p className="italic">{speciesData.genera.find(g => g.language.name === 'fr').genus}</p>
            </div>

            <div className="flex justify-center gap-8 mb-4">
                {pokemonDetails.types.map((type, index) => (
                    <span key={index} className={ `px-3 py-1 bg-gray-200 rounded-md uppercase  ${typeStyles.colors[type.type.name]} 
                       shadow-md backdrop-blur-sm`}>
                        {typeStyles.frenchNames[type.type.name] || type.type.name}
                    </span>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4 text-black mb-4">
                <div>
                    <p><span className="text-gray-600">TAILLE:</span> {pokemonDetails.height / 10} m</p>
                    <p><span className="text-gray-600">POIDS:</span> {pokemonDetails.weight / 10} kg</p>
                </div>
                <div className="text-right">
                    <p><span className="text-gray-600">CATÉGORIE</span> {speciesData.genera.find(g => g.language.name === 'fr').genus}</p>
                </div>
            </div>

            <div className="bg-gray-100 p-3 rounded-md">
                <p className="text-sm text-gray-700">
                    {frenchEntry ? frenchEntry.flavor_text.replace(/[\n\f]/g, ' ') : 'Description non disponible'}
                </p>
            </div>
        </div>
    );
}