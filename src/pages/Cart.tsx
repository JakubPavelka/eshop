import "./Cart.scss";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  RemoveCartFav,
  IncreaseDecreaseCart,
  IncreaseByAmount,
} from "../store/features/itemsStateSlice";
import { Link } from "react-router-dom";
import { BiTrash, BiPlus, BiMinus } from "react-icons/bi";
import NoItemsCartFav from "../components/items/NoItemsCartFav";

import { AnimatePresence, motion } from "framer-motion";

const Cart = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.itemstate.cart);

  let totalPrice = 0;
  items.forEach((item) => {
    totalPrice += item.price * (item.count || 1);
  });

  return (
    <div className="container">
      {items.length === 0 ? (
        <NoItemsCartFav where="in cart" />
      ) : (
        <>
          <h4 className="your-cart-h4">Your cart</h4>
          <div className="cart-w-items">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ left: 0, opacity: 1 }}
                  exit={{ left: -30, opacity: 0 }}
                  className="cart-w-items-row"
                >
                  <Link to={`/products/${item.id}`}>
                    <img
                      className="cart-image"
                      src={item.image}
                      alt={item.title}
                    />
                  </Link>
                  <p>{item.title}</p>
                  <div className="cart-price">
                    {(item.price * (item.count || 1)).toFixed(2)}$
                  </div>
                  <div className="cart-item-counter">
                    <BiMinus
                      onClick={() =>
                        dispatch(
                          IncreaseDecreaseCart({
                            id: item.id,
                            type: "decrease",
                          })
                        )
                      }
                    />
                    <input
                      type="number"
                      name="cart-item-count-input"
                      className="cart-item-count-input"
                      value={item.count || 1}
                      onChange={(e) =>
                        dispatch(
                          IncreaseByAmount({
                            id: item.id,
                            count: Number(e.target.value),
                          })
                        )
                      }
                    />
                    <BiPlus
                      onClick={() =>
                        dispatch(
                          IncreaseDecreaseCart({
                            id: item.id,
                            type: "increase",
                          })
                        )
                      }
                    />
                  </div>
                  <BiTrash
                    className="cart-delete"
                    onClick={() =>
                      dispatch(
                        RemoveCartFav({
                          id: item.id,
                          type: "cart",
                        })
                      )
                    }
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="cart-total">
            <p>
              Total Price: <span>{totalPrice.toFixed(2)}$</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
