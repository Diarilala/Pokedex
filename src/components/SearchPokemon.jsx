export default function PokeSearch({onSearch}) {
    return (
        <input type="text"
        onChange={(e) => onSearch(e.target.value)}
               className="w-[100%] border-2 rounded-2xl p-1 text-center text-xl font-micro"
        placeholder={'Enter a pokemon name ...'}/>
    )
}