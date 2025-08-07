import PokemonItem from "./PokemonItem";

export default function PokemonList({ pokemonList, selectedIndex, offset }) {
  return (
    <div className="pokemon-list overflow-hidden h-[195px]">
      {pokemonList.map((pokemon, index) => (
        <PokemonItem 
          key={pokemon.id}
          pokemon={pokemon}
          isSelected={index + offset === selectedIndex}
        />
      ))}
    </div>
  );
}