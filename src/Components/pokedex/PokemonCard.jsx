import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { bgByType, borderByType, textByType } from "../../constants/pokemon";

const PokemonCard = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState(null);
  const types = pokemon?.types.map((type) => type.type.name).join(" / ");

  const firstType = pokemon?.types[0].type.name

  useEffect(() => {
    axios
      .get(pokemonUrl)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Link
      to={`/pokedex/${pokemon?.id}`}
      className={`capitalize border-8 rounded-lg grid gap-2 ${borderByType[firstType]}`}
    >
      <header className={`${bgByType[firstType]} h-[140px]`}></header>
      <div className="relative pt-14">
        <div className="absolute w-full top-0 -translate-y-2/3">
          <img
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt=""
            className="max-w-[180px] mx-auto block"
          />
        </div>
        <h3 className={`text-2xl font-medium text-center ${textByType[firstType]}`}>{pokemon?.name}</h3>
        <span className="text-sm font-normal flex justify-center items-center">
          {types}
        </span>
        <h5 className="text-xs font-normal text-center text-[#9F9F9F] mb-2">
          type
        </h5>
        <ul className="border-t-2 border-slate-200 text-xs grid grid-cols-2 p-2 gap-4 justify-center items-center text-center">
          {pokemon?.stats.slice(0, 4).map((stat) => (
            <li key={stat.stat.name}>
              <h6 className="text-[#9F9F9F]">{stat.stat.name}</h6>
              <span className={`${textByType[firstType]}`}>{stat.base_stat}</span>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
};
export default PokemonCard;
