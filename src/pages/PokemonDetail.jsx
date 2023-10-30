import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderPokeball from "../Components/layouts/HeaderPokeball";
import { bgByType, borderByType, textByType } from "../constants/pokemon";

const PokemonDetail = () => {
  const [pokemon, setPokemon] = useState(null);

  const types = pokemon?.types.map((type) => type.type.name).join(" / ");

  const firstType = pokemon?.types[0].type.name;

  const { pokemonId } = useParams();

  const getPercentStat = (statValue) => {
    const MAX_STAT_VALUE = 255;
    const percentStat = ((statValue * 100) / MAX_STAT_VALUE).toFixed(1);
    return `${percentStat}%`;
  };

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="grid text-center capitalize bg-slate-200">
      <HeaderPokeball />
      <section className="grid place-content-center p-60 min-w-full">
        <article className="bg-white rounded-sm w-[900px] shadow-2xl">
          <header className={`w-auto h-[150px] ${bgByType[firstType]} flex place-content-center relative`}>
            <img
            className="absolute -top-60"
              src={pokemon?.sprites.other["official-artwork"].front_default}
              alt=""
            />
          </header>
          <h3 className="font-semibold">#{pokemon?.id}</h3>
          <div className="grid grid-cols-3 justify-center items-center">
            <div className={`${bgByType[firstType]} h-0.5`}></div>
            <h2 className={`font-semibold ${textByType[firstType]} text-4xl`}>
              {pokemon?.name}
            </h2>
            <div className={`${bgByType[firstType]} h-0.5`}></div>
          </div>

          {/* Types */}
          <div className="py-2">
            <h3 className="font-semibold">Type</h3>
            <div>
              <h4 className="flex place-content-center">
                <span className={`border-2 p-1 rounded-md ${borderByType[firstType]}`}>{types}</span>
              </h4>
            </div>
          </div>
          {/* Abilities */}
          <div className="py-2">
            <h3 className="font-semibold">Abilities</h3>
            <div>
              <h4 className="flex place-content-center gap-2">
                {pokemon?.abilities.map((ability) => (
                  <ul className={`border-2 p-1 rounded-md ${borderByType[firstType]}`} key={ability.ability.name}>
                    <div>
                      <h5>{ability.ability.name}</h5>
                    </div>
                  </ul>
                ))}
              </h4>
            </div>
          </div>

          {/* Stats */}
          <section>
            <h3 className="text-start px-4 text-lg font-semibold">Stats</h3>
            <ul className="grid gap-4 p-4">
              {pokemon?.stats.map((stat) => (
                <li className="capitalize" key={stat.stat.name}>
                  <div className="flex justify-between items-center">
                    <h5>{stat.stat.name}</h5>
                    <span>{stat.base_stat}/255</span>
                  </div>
                  {/* Total Bar */}
                  <div className="bg-slate-200 rounded-md h-6 overflow-hidden">
                    {/* Bar progess */}
                    <div
                      style={{ width: getPercentStat(stat.base_stat) }}
                      className="bg-yellow-400 h-full"
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </section>
    </main>
  );
};
export default PokemonDetail;
