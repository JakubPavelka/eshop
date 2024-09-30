import "./Favourites.scss";
import { useAppDispatch, useAppSelector } from "../store/store";
import { RemoveCartFav, AddCartFav } from "../store/features/itemsStateSlice";
import NoItemsCartFav from "../components/items/NoItemsCartFav";
import { Link } from "react-router-dom";
import { BiTrash, BiCart } from "react-icons/bi";

import { AnimatePresence, motion } from "framer-motion";

const Favourites = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.itemstate.fav);

  return (
    <div className="container">
      {items.length === 0 ? (
        <NoItemsCartFav where="in favourites" />
      ) : (
        <section className="favourites-w-items">
          <h4>Your favourite items</h4>
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                initial={{ left: 0, opacity: 1 }}
                exit={{ left: -30, opacity: 0 }}
                className="favourites-w-items-row"
                key={item.id}
              >
                <Link to={`/products/${item.id}`}>
                  <img src={item.image} alt={item.title} />
                </Link>
                <p className="favourites-w-items-text">
                  {item.title}
                  <span>{item.price}$</span>
                </p>
                <div
                  className="favourites-w-items-delete-cart"
                  onClick={() =>
                    dispatch(RemoveCartFav({ id: item.id, type: "favourites" }))
                  }
                >
                  <BiCart
                    onClick={() =>
                      dispatch(
                        AddCartFav({
                          id: item.id,
                          title: item.title,
                          price: item.price,
                          image: item.image,
                          type: "cart",
                        })
                      )
                    }
                  />
                  <BiTrash
                    onClick={() =>
                      dispatch(
                        RemoveCartFav({ id: item.id, type: "favourites" })
                      )
                    }
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>
      )}
    </div>
  );
};

export default Favourites;
