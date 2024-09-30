import "./Filter.scss";
import { BiFilter } from "react-icons/bi";
import { useState, useEffect } from "react";
import { BiCaretRight } from "react-icons/bi";
import { useAppDispatch } from "../../store/store";
import { fetchItems, resetItems } from "../../store/features/itemsSlice";
import {
  lowToHighReducer,
  highToLowReducer,
  resetFilterReducer,
} from "../../store/features/itemsFilterSlice";

import { AnimatePresence, motion } from "framer-motion";

interface FilterProps {
  hideCategory?: boolean;
}

const Filter: React.FC<FilterProps> = ({ hideCategory }) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState({
    filter: false,
    category: false,
    rating: false,
    price: false,
  });

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 577);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 577);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggle = (
    section: "category" | "rating" | "price" | "filter"
  ) => {
    if (section === "filter" && isOpen.filter) {
      setIsOpen({
        filter: false,
        category: false,
        rating: false,
        price: false,
      });
    } else {
      setIsOpen((prev) => ({
        ...prev,
        [section]: !prev[section],
      }));
    }
  };

  useEffect(() => {
    if (!isOpen.filter) {
      setIsOpen({
        filter: false,
        category: false,
        rating: false,
        price: false,
      });
    }
  }, [isOpen.filter]);

  const handleFilterCategory = (category: string) => {
    dispatch(fetchItems(category));
  };

  const variantsFilter = {
    hiddenh5: { opacity: 0 },
    visibleh5: { opacity: 1 },
  };

  const variantsDiv = {
    close: { maxWidth: "63px", width: "max-content" },
    open: { maxWidth: "150px", width: "100%" },
  };
  const variantsLi = {
    close: { height: 0, opacity: 0 },
    open: { height: 22, opacity: 1 },
  };
  const variantsLiDiv = {
    close: { height: 0 },
    open: { height: "auto" },
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={variantsDiv}
        initial="close"
        animate={isOpen.filter ? "open" : "close"}
        exit="close"
        transition={{ duration: 0.2 }}
        className={`filter ${isOpen.filter && isDesktop ? "active" : ""}`}
      >
        <p onClick={() => handleToggle("filter")}>
          <span>
            <BiFilter />
          </span>
          Filter{" "}
        </p>{" "}
        <br />
        {isOpen.filter && (
          <>
            {!hideCategory && (
              <>
                <motion.h5
                  variants={variantsFilter}
                  initial="hiddenh5"
                  animate="visibleh5"
                  exit="hiddenh5"
                  transition={{ duration: 0.2 }}
                  onClick={() => handleToggle("category")}
                >
                  Category{" "}
                  <BiCaretRight
                    className={`${isOpen.category ? "active" : ""}`}
                  />
                </motion.h5>
                <AnimatePresence>
                  {isOpen.category && (
                    <motion.ul
                      className="filter-category"
                      initial="close"
                      animate="open"
                      exit="close"
                      transition={{ duration: 0.1 }}
                      variants={variantsLiDiv}
                    >
                      <motion.div
                        className={`filters-li-div ${
                          isOpen.category ? "active" : ""
                        }`}
                      >
                        <motion.li
                          variants={variantsLi}
                          transition={{ duration: 0.2 }}
                          onClick={() => handleFilterCategory("men's clothing")}
                        >
                          Men's clothing
                        </motion.li>
                        <motion.li
                          variants={variantsLi}
                          transition={{ duration: 0.2 }}
                          onClick={() =>
                            handleFilterCategory("women's clothing")
                          }
                        >
                          Women's clothing
                        </motion.li>
                        <motion.li
                          variants={variantsLi}
                          transition={{ duration: 0.2 }}
                          onClick={() => handleFilterCategory("electronics")}
                        >
                          Electronics
                        </motion.li>
                        <br />
                        <motion.li
                          variants={variantsLi}
                          transition={{ duration: 0.2 }}
                          onClick={() => handleFilterCategory("jewelery")}
                        >
                          Jewelry
                        </motion.li>
                      </motion.div>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </>
            )}
            <motion.h5
              variants={variantsFilter}
              initial="hiddenh5"
              animate="visibleh5"
              exit="hiddenh5"
              transition={{ duration: 0.2 }}
              onClick={() => handleToggle("rating")}
            >
              Rating{" "}
              <BiCaretRight className={`${isOpen.rating ? "active" : ""}`} />
            </motion.h5>{" "}
            <br />
            <AnimatePresence>
              {isOpen.rating && (
                <motion.ul
                  initial="close"
                  animate="open"
                  exit="close"
                  transition={{ duration: 0.1 }}
                  variants={variantsLiDiv}
                  className="filter-rating"
                >
                  <motion.div
                    className={`filters-li-div ${
                      isOpen.rating ? "active" : ""
                    }`}
                  >
                    <motion.li
                      variants={variantsLi}
                      transition={{ duration: 0.2 }}
                      onClick={() => dispatch(lowToHighReducer("filterRating"))}
                    >
                      Low to high
                    </motion.li>
                    <motion.li
                      variants={variantsLi}
                      transition={{ duration: 0.2 }}
                      onClick={() => dispatch(highToLowReducer("filterRating"))}
                    >
                      High to low
                    </motion.li>
                  </motion.div>
                </motion.ul>
              )}
            </AnimatePresence>
            <motion.h5
              variants={variantsFilter}
              initial="hiddenh5"
              animate="visibleh5"
              exit="hiddenh5"
              transition={{ duration: 0.2 }}
              onClick={() => handleToggle("price")}
            >
              Price{" "}
              <BiCaretRight className={`${isOpen.price ? "active" : ""}`} />
            </motion.h5>
            <AnimatePresence>
              {isOpen.price && (
                <motion.ul
                  initial="close"
                  animate="open"
                  exit="close"
                  transition={{ duration: 0.1 }}
                  variants={variantsLiDiv}
                  className="filter-price"
                >
                  <motion.div
                    className={`filters-li-div ${isOpen.price ? "active" : ""}`}
                  >
                    <motion.li
                      variants={variantsLi}
                      transition={{ duration: 0.2 }}
                      onClick={() => dispatch(lowToHighReducer("filterPrice"))}
                    >
                      Low to high
                    </motion.li>
                    <motion.li
                      variants={variantsLi}
                      transition={{ duration: 0.2 }}
                      onClick={() => dispatch(highToLowReducer("filterPrice"))}
                    >
                      High to low
                    </motion.li>
                  </motion.div>
                </motion.ul>
              )}
            </AnimatePresence>
            <motion.button
              initial={{ opacity: 0, width: "100%" }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                dispatch(resetItems());
                dispatch(resetFilterReducer());
              }}
              className="filter-reset-btn"
            >
              Reset
            </motion.button>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Filter;
