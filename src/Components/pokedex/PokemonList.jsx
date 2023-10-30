import PokemonCard from "./PokemonCard";

const PokemonList = ({ pokemons }) => {
  return (
    <section>
      <section className="p-10 grid grid-cols-[repeat(auto-fit,_270px)] justify-center max-w-[1440px] mx-auto gap-6 py-10 ">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />
        ))}
      </section>
    </section>
  );
};
export default PokemonList;
