const HeaderPokeball = () => {
  return (
    <header>
      <div className="bg-[#DD1A1A] h-10">
        <div className="h-full pl-4">
          <img
            className="h-[36px] sm:h-full w-auto translate-y-3 relative z-10"
            src="/images/logo.png"
            alt=""
          />
        </div>
      </div>
      <div className="bg-black h-9 relative">
        <div className="h-16 w-16 bg-white border-8 border-black rounded-full absolute right-10 -translate-x-1/2 -translate-y-[20%] grid place-content-center">
          <div className="h-9 w-9 rounded-full bg-[#000000] border-8 border-black"></div>
        </div>
      </div>
    </header>
  );
};
export default HeaderPokeball;
