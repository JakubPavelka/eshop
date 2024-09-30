import "./Navbar.scss";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  BiSolidShoppingBags,
  BiChevronDown,
  BiSearch,
  BiCart,
  BiMenu,
  BiHeart,
} from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { toggleMenu, closeMenu } from "../../store/features/hamburgerMenuSlice";
import { resetItems, fetchItems } from "../../store/features/itemsSlice";
import { openSearch } from "../../store/features/searchSlice";
import { closeSearch } from "../../store/features/searchSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const hamburgerState = useAppSelector((state) => state.hamburger.isOpen);

  const [productsOpen, setProductsOpen] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLUListElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);

  const handleClickHome = () => {
    dispatch(resetItems());
    dispatch(closeSearch());
  };

  const handleHamburgerOpen = () => {
    dispatch(toggleMenu());
  };

  const handleProductsOpen = () => {
    setProductsOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node) &&
      !hamburgerRef.current?.contains(event.target as Node)
    ) {
      dispatch(closeMenu());
    }
  };

  const handleLinkClick = (category: string) => {
    dispatch(toggleMenu());
    dispatch(fetchItems(category));
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && hamburgerState) {
        dispatch(toggleMenu());
      }
    };

    window.addEventListener("resize", handleResize);
    if (hamburgerState) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [hamburgerState, productsOpen]);

  return (
    <div className="container">
      <nav>
        <Link className="logo" to="/" onClick={handleClickHome}>
          <h2>Eshop</h2>
          <BiSolidShoppingBags />
        </Link>

        <ul
          ref={sidebarRef}
          onClick={(e) => e.stopPropagation()}
          className={`links ${hamburgerState ? "active" : ""}`}
        >
          <li className="products">
            <span onClick={handleProductsOpen}>
              Products
              <BiChevronDown />
            </span>
            <ul className={`dropdown ${productsOpen ? "active" : ""}`}>
              <li>
                <Link
                  onClick={() => handleLinkClick("men's clothing")}
                  to="clothing-men"
                >
                  Men's clothing
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleLinkClick("women's clothing")}
                  to="clothing-women"
                >
                  Women's clothing
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleLinkClick("electronics")}
                  to="electronics"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link onClick={() => handleLinkClick("jewelery")} to="jewelery">
                  Jewelery
                </Link>
              </li>
            </ul>
          </li>
        </ul>
        <div className="cart-search">
          <BiSearch onClick={() => dispatch(openSearch())} />
          <Link className="favourites-a" to="favourites">
            <BiHeart />
          </Link>
          <Link className="cart-a" to="cart">
            <BiCart />
          </Link>
          <div
            ref={hamburgerRef}
            onClick={handleHamburgerOpen}
            className="hamburger"
          >
            <BiMenu />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
