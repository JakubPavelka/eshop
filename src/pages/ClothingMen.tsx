import Filter from "../components/filter/Filter";
import Items from "../components/items/Items";

const ClothingMen = () => {
  return (
    <div className="home-filter-items container">
      <Filter hideCategory={true} />
      <Items title="Men's clothing" category="men's clothing" />
    </div>
  );
};

export default ClothingMen;
