import { useDispatch } from "react-redux";
import { setTrainerName } from "../store/slices/trainerName.slice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setTrainerName(e.target.trainerName.value));
    navigate("/pokedex");
  };

  return (
    <main className="h-screen grid grid-rows-[1fr_auto]">
      <section className="grid place-content-center text-center">
        <div>
          <div>
            <img src="/images/logo.png" alt="" />
          </div>
          <div>
            <h3 className="text-[#FE1936] text-5xl font-bold">¡Hi Coach!</h3>
            <p className="font-bold text-3xl">To start give your name</p>
          </div>
          <form
            className="flex text-center justify-between shadow-md pt-4"
            onSubmit={handleSubmit}
          >
            <input
              className="bg-white text-xl text-center font-bold capitalize w-full"
              name="trainerName"
              type="text"
              placeholder="Your name..."
            />
            <button className="w-1/3 h-auto bg-[#D93F3F] text-white font-bold text-xl">
              Start!
            </button>
          </form>
        </div>
      </section>

      <footer>
        <div className="bg-[#DD1A1A] h-16"></div>
        <div className="bg-black h-12 relative">
          <div className="h-20 w-20 bg-white border-8 border-black rounded-full absolute left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-content-center">
            <div className="h-12 w-12 rounded-full bg-[#000000] border-8 border-black"></div>
          </div>
        </div>
      </footer>
    </main>
  );
};
export default Home;
