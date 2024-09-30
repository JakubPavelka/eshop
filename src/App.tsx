import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { store } from "./store/store";
import { Provider } from "react-redux";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ClothingMen from "./pages/ClothingMen";
import ClothingWomen from "./pages/ClothingWomen";
import Electronics from "./pages/Electronics";
import Jewelery from "./pages/Jewelery";
import Product from "./pages/Product";
import ErrorProduct from "./pages/ErrorProduct";
import ErrorPage from "./pages/ErrorPage";
import { useAppSelector } from "./store/store";
import Favourites from "./pages/Favourites";
import { useRef, useEffect } from "react";
import Search from "./components/search/Search";

const Layout = () => {
  const hamburgerState = useAppSelector((state) => state.hamburger.isOpen);
  const AppRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (AppRef.current) {
        if (window.innerWidth >= 768) {
          AppRef.current.classList.remove("overflow");
        } else if (hamburgerState) {
          AppRef.current.classList.add("overflow");
        }
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [hamburgerState]);

  return (
    <div ref={AppRef} className={`app ${hamburgerState ? "overflow" : ""}`}>
      <Header />
      <Search />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "cart", element: <Cart /> },
      { path: "*", element: <ErrorPage /> },
      { path: "clothing-men", element: <ClothingMen /> },
      { path: "clothing-women", element: <ClothingWomen /> },
      { path: "electronics", element: <Electronics /> },
      { path: "jewelery", element: <Jewelery /> },
      { path: "products/:id", element: <Product /> },
      { path: "products/error", element: <ErrorProduct /> },
      { path: "favourites", element: <Favourites /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
