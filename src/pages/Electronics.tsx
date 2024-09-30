import Filter from "../components/filter/Filter";
import Items from "../components/items/Items";

const Electronics = () => {
  return (
    <div className="home-filter-items container">
      <Filter hideCategory={true} />
      <Items title="Electronics" category="electronics" />
    </div>
  );
};

export default Electronics;
