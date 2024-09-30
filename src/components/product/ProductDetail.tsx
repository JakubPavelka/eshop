import "./ProductDetail.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import Expander from "../expander/Expander";
import { BiSolidStar, BiHeart, BiSolidHeart } from "react-icons/bi";
import { AddCartFav } from "../../store/features/itemsStateSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const favItems = useAppSelector((state) => state.itemstate.fav);

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const HeartIcon = favItems.some((fav) => fav.id === product?.id)
    ? BiSolidHeart
    : BiHeart;

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const productData = await response.json();
        setProduct(productData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  useEffect(() => {
    if (error) {
      navigate("/products/error");
    }
  }, [error, navigate]);

  return (
    <section className={`product-detail ${loading ? "loading" : ""}`}>
      {loading ? (
        <Spinner />
      ) : (
        product && (
          <div className="container">
            <div className="product-detail-card">
              <Expander src={product.image} alt={product.title} />
              <div className="product-detail-card-info">
                <h3>{product.title}</h3>
                <p className="product-detail-desc">{product.description}</p>
                <p className="product-detail-rating">
                  {product.rating.rate}
                  <BiSolidStar />
                  <span>{product.rating.count}x</span>
                </p>
                <div className="product-detail-cart-fav">
                  <button
                    onClick={() =>
                      dispatch(
                        AddCartFav({
                          id: product.id,
                          title: product.title,
                          price: product.price,
                          image: product.image,
                          type: "cart",
                        })
                      )
                    }
                  >
                    Add to cart
                  </button>
                  <HeartIcon
                    onClick={() =>
                      dispatch(
                        AddCartFav({
                          id: product.id,
                          title: product.title,
                          price: product.price,
                          image: product.image,
                          type: "favourites",
                        })
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </section>
  );
};

export default ProductDetail;
