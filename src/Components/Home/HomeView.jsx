import Hero from "./Hero";
import LatestProductsView from "./LatestProductsView";

const HomeView = (props) => {
  return (
    <div className="pt-20">
      <Hero />
      <LatestProductsView {...props} />
    </div>
  );
};

export default HomeView;
