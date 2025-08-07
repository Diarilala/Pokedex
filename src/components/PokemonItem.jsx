export default function PokemonItem({ pokemon, isSelected }) {
  return (
    <div className={`pokemon-item ${isSelected ? 'selected' : ''} bg-amber-100 rounded-[20px_7px_7px_20px] h-7 w-44`}>
      <div className="pokeball-icon">
        <img src="src\assets\Pokeball (1).png" alt="" className="h-5"/>
      </div>
      <span className="pokemon-id">{pokemon.id.toString().padStart(3, '0')}</span>
      <span className="pokemon-name text-gray-600 font-micro text-2xl">{pokemon.name.toUpperCase()}</span>
    </div>
  );
}