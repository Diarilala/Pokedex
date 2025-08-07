import { useState, useEffect } from 'react';

export default function PokemonSprite({pokemonId}) {
  const [spriteUrl, setSpriteUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPokemon() {
            try {
                setLoading(true);
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
                const data = await response.json();
                setSpriteUrl(data.sprites.front_default);
                setError(null);
            } catch (err) {
                setError('Failed to load Pokémon');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchPokemon();
    }, [pokemonId]);

    if (loading) return <div>Loading sprite...</div>;
    if (error) return <div>{error}</div>;

    return (
        <img 
            src={spriteUrl} 
            alt={`Pokemon ${pokemonId}`} 
            style={{ imageRendering: 'pixelated' }}
            className='rounded-lg outline-3 outline-teal-600 w-[100%]'
        />
    );
}