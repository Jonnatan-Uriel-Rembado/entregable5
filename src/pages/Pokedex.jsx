import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PokemonList from "../Components/pokedex/PokemonList";
import HeaderPokeball from "../Components/layouts/HeaderPokeball";
import { paginateData } from "../utils/pagination";

const Pokedex = () => {
  //? Aqui estan todos nuestros pokemons
  const [pokemons, setPokemons] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [types, setTypes] = useState([]);
  const [currentType, setCurrentType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const trainerName = useSelector((store) => store.trainerName);

  const pokemonsByName = pokemons.filter((pokemon) =>
    pokemon.name.includes(pokemonName)
  );

  const { itemsInCurrentPage, lastPage, pagesInCurrentBlock } = paginateData(
    currentPage,
    pokemonsByName
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.target.pokemonName.value.toLowerCase().trim());
  };

  const handleChangeType = (e) => {
    setCurrentType(e.target.value);
  };

  const handlePreviusPage = () => {
    const newCurrentPage = currentPage - 1;
    if (newCurrentPage >= 1) {
      setCurrentPage(newCurrentPage);
    }
  };

  const handleNextPage = () => {
    const newCurrentPage = currentPage + 1;
    if (newCurrentPage <= lastPage) setCurrentPage(currentPage + 1);
  };

  //? Trae todos los pokemons
  useEffect(() => {
    if (currentType === "") {
      axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=1292")
        .then(({ data }) => setPokemons(data.results))
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  //? Trae todos los types disponibles de pokemons
  useEffect(() => {
    axios
      .get(" https://pokeapi.co/api/v2/type")
      .then(({ data }) => setTypes(data.results))
      .catch((err) => console.log(err));
  }, []);

  //? Trae todos los pokemons en base a un tipo
  useEffect(() => {
    if (currentType !== "") {
      axios
        .get(` https://pokeapi.co/api/v2/type/${currentType}/`)
        .then(({ data }) => {
          setPokemons(data.pokemon.map((pokemon) => pokemon.pokemon));
        })
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  //* Reseteo de pagina actual al cambiar de tipo
  useEffect(() => {
    setCurrentPage(1);
  }, [currentType]);

  return (
    <main>
      <HeaderPokeball />
      <section className="max-w-[1440px] grid content-between mx-auto text-xl font-bold p-10 gap-5">
        <p className="text-[#333333]">
          <span className="capitalize text-[#DD1A1A]">
            Welcome {trainerName},{" "}
          </span>
          here you can find your favorite pokemon.
        </p>
        <form
          className="capitalize h-[68px] flex justify-between gap-2"
          onSubmit={handleSubmit}
        >
          <div className="w-1/2 text-lg font-normal border border-slate-300 flex justify-between shadow-md">
            <input
              className="px-2 w-2/3"
              name="pokemonName"
              type="text"
              placeholder="type a pokemon"
            />
            <button className="bg-[#D93F3F] text-white p-1 w-1/3">
              Search
            </button>
          </div>

          <select
            className="capitalize w-1/2 font-normal text-lg text-[#0F0F2D] shadow-md"
            onChange={handleChangeType}
          >
            <option value="">All pokemons</option>
            {types.map((type) => (
              <option value={type.name} key={type.url}>
                {type.name}
              </option>
            ))}
          </select>
        </form>
      </section>

      <ul className="flex justify-center gap-4 flex-wrap p-2">
        {currentPage !== 1 && (
          <li className="border-2 border-black w-10 flex place-content-center text-white bg-[#DD1A1A]">
            <button onClick={handlePreviusPage}>{"<"}</button>
          </li>
        )}
        {pagesInCurrentBlock.map((page) => (
          <li key={page}>
            <button
              onClick={() => setCurrentPage(page)}
              className={`p-2 font-bold w-10 border-black ${
                currentPage === page ? "bg-red-500 text-white border-2 border-black" : ""
              }`}
            >
              {page}
            </button>
          </li>
        ))}
        {currentPage !== lastPage && (
          <li className="border-2 border-black w-10 flex place-content-center bg-[#DD1A1A] text-white">
            <button onClick={handleNextPage}>{">"}</button>
          </li>
        )}
      </ul>

      <PokemonList pokemons={itemsInCurrentPage} />

      <ul className="flex justify-center gap-4 flex-wrap p-2">
        {currentPage !== 1 && (
          <li className="border-2 border-black w-10 flex place-content-center text-white bg-[#DD1A1A]">
            <button onClick={handlePreviusPage}>{"<"}</button>
          </li>
        )}
        {pagesInCurrentBlock.map((page) => (
          <li key={page}>
            <button
              onClick={() => setCurrentPage(page)}
              className={`p-2 font-bold w-10 ${
                currentPage === page ? "bg-red-500" : "text-black"
              }`}
            >
              {page}
            </button>
          </li>
        ))}
        {currentPage !== lastPage && (
          <li className="border-2 border-black w-10 flex place-content-center bg-[#DD1A1A] text-white">
            <button onClick={handleNextPage}>{">"}</button>
          </li>
        )}
      </ul>
    </main>
  );
};
export default Pokedex;
