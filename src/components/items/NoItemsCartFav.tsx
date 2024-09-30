import "./NoItemsCartFav.scss";
import { Link } from "react-router-dom";
import { resetItems } from "../../store/features/itemsSlice";
import { useAppDispatch } from "../../store/store";
import { closeSearch } from "../../store/features/searchSlice";

const NoItemsCartFav: React.FC<{ where: string }> = (props) => {
  const dispatch = useAppDispatch();

  const handleClickHome = () => {
    dispatch(resetItems());
    dispatch(closeSearch());
  };

  return (
    <div className="cart-fav-no-items">
      <h4>No items {props.where}</h4>
      <Link onClick={handleClickHome} to="/">
        Home
      </Link>
    </div>
  );
};

export default NoItemsCartFav;
