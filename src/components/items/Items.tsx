import "./Items.scss";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchItems } from "../../store/features/itemsSlice";
import { BiSolidStar, BiSolidHeart, BiHeart } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Item } from "../../store/features/itemsSlice";
import { AddCartFav } from "../../store/features/itemsStateSlice";

import { motion } from "framer-motion";

import "react-loading-skeleton/dist/skeleton.css";
import SkeletonItem from "../skeleton/SkeletonItem";

interface ItemsProps {
  title: string;
  category?: string;
}

const Items: React.FC<ItemsProps> = ({ title, category }) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.items);
  const randomizedItems = items.randomizedItems;
  const favItems = useAppSelector((state) => state.itemstate.fav);
  const filterPrice = useAppSelector((state) => state.filter.filterPrice);
  const filterRating = useAppSelector((state) => state.filter.filterRating);
  const [sortedItems, setSortedItems] = useState<Item[]>([]);
  const [clickedItems, setClickedItems] = useState<{ [key: number]: boolean }>(
    {}
  );

  const handleClick = (item: Item) => {
    setClickedItems((prev) => ({ ...prev, [item.id]: true }));

    dispatch(
      AddCartFav({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        type: "cart",
      })
    );

    setTimeout(() => {
      setClickedItems((prev) => ({ ...prev, [item.id]: false }));
    }, 1000);
  };

  useEffect(() => {
    let sorted = [...randomizedItems];

    if (filterPrice.lowToHigh) {
      sorted.sort((a, b) => a.price - b.price);
    } else if (filterPrice.highToLow) {
      sorted.sort((a, b) => b.price - a.price);
    } else if (filterRating.lowToHigh) {
      sorted.sort((a, b) => a.rating.rate - b.rating.rate);
    } else if (filterRating.highToLow) {
      sorted.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    setSortedItems(sorted);
  }, [filterPrice, filterRating, items]);

  useEffect(() => {
    if (!items.items.length && !items.loading) {
      dispatch(fetchItems(category));
    }
  }, [dispatch, items.items.length, items.loading, category]);

  const skeletonCount = 8;

  return (
    <div>
      <h2 className="items-h2">{title}</h2>
      {items.loading ? (
        <section className="items-grid">
          {[...Array(skeletonCount)].map((_, index) => (
            <SkeletonItem key={index} />
          ))}
        </section>
      ) : null}

      {!items.loading && items.error ? <div>Error: {items.error}</div> : null}
      {!items.loading && items.items.length ? (
        <section className="items-grid">
          {sortedItems.map((item) => {
            const isFavorite = favItems.some((fav) => fav.id === item.id);
            const HeartIcon = isFavorite ? BiSolidHeart : BiHeart;

            return (
              <div className="items-card" key={item.id}>
                <Link to={`/products/${item.id}`}>
                  <img src={item.image} alt={item.title} />
                  <div className="rating">
                    <p className="rating-wrapper">
                      Rating: {item.rating.rate} <BiSolidStar />
                    </p>
                    <p className="rating-count">{item.rating.count}x</p>
                  </div>
                  <h4>{item.title}</h4>
                  <h3>{item.price}$</h3>
                </Link>
                <div className="items-add-cart-fav">
                  <HeartIcon
                    onClick={() =>
                      dispatch(
                        AddCartFav({
                          id: item.id,
                          title: item.title,
                          price: item.price,
                          image: item.image,
                          type: "favourites",
                        })
                      )
                    }
                  />
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    initial={{ backgroundColor: "#007bff" }}
                    animate={{
                      backgroundColor: clickedItems[item.id]
                        ? "#4CCD1F"
                        : "#007bff",
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    onClick={() => handleClick(item)}
                  >
                    Add to cart
                  </motion.button>
                </div>
              </div>
            );
          })}
        </section>
      ) : null}
    </div>
  );
};

export default Items;
