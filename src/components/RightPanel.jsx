import { useState, useEffect } from 'react';
import PokemonList from './List';

export default function RightPanel({ pokemonList, selectedIndex }) {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 6 });

  // Update visible range when selectedIndex changes
  useEffect(() => {
    const newStart = Math.max(0, selectedIndex - 3);
    const newEnd = Math.min(pokemonList.length - 1, selectedIndex + 3);
    setVisibleRange({ start: newStart, end: newEnd });
  }, [selectedIndex, pokemonList.length]);

  // Get the subset of Pokémon to display
  const visiblePokemon = pokemonList.slice(visibleRange.start, visibleRange.end + 1);

  return (
    <div className="pokedex-right">
      <div className="list-header">
      </div>
      <PokemonList 
        pokemonList={visiblePokemon}
        selectedIndex={selectedIndex}
        offset={visibleRange.start}
      />
    </div>
  );
}