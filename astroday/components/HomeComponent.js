import Gallery from "../pages/gallery";

const HomePage = ({ children }) => {
  return (
    <>
      <h1>HOME COMPONENT</h1>
      {children}
      <Gallery />
    </>
  );
};

export default HomePage;
