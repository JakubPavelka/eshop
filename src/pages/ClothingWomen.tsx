import Filter from "../components/filter/Filter";
import Items from "../components/items/Items";

const ClothingWomen = () => {
  return (
    <div className="home-filter-items container">
      <Filter hideCategory={true} />
      <Items title="Women's clothing" category="women's clothing" />
    </div>
  );
};

export default ClothingWomen;
