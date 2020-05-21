import Gallery from "../pages/gallery";

const HomePage = ({ children }) => {
  return (
    <div className="sm:m-5 md:m-10 lg:my-10 xl:ml-15">
      <div className="my-5 md:my-5 lg:my-5 ">
        <h1 className="font-bold text-3xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl text-center font-poppins">
          Search Astronomy Pictures
        </h1>
      </div>
      {children}
    </div>
  );
};

export default HomePage;
