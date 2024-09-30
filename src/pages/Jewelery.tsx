import Filter from "../components/filter/Filter";
import Items from "../components/items/Items";

const Jewelery = () => {
  return (
    <div className="home-filter-items container">
      <Filter hideCategory={true} />
      <Items title="Jewelery" category="jewelery" />
    </div>
  );
};

export default Jewelery;
