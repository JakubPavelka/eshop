import Filter from "../components/filter/Filter";
import Items from "../components/items/Items";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home-filter-items container">
      <Filter hideCategory={false} />
      <Items title="All products" />
    </div>
  );
};

export default Home;
