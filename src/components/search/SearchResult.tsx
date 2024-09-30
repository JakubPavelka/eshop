import { Link } from "react-router-dom";
import "./SearchResult.scss";
import { useAppDispatch } from "../../store/store";
import { closeSearch } from "../../store/features/searchSlice";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const SearchResult = ({
  results,
  input,
  setResults,
  setInput,
}: {
  results: Product[];
  input: string;
  setResults: React.Dispatch<React.SetStateAction<Product[]>>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const dispatch = useAppDispatch();
  const hasResults = results.length > 0;

  const LinkClick = () => {
    setResults([]);
    setInput("");
    dispatch(closeSearch());
  };

  if (input.length >= 1 && !hasResults) {
    return <p className="no-results">No items found</p>;
  }

  return (
    <div className={`search-results ${hasResults ? "active" : ""}`}>
      {results.map((result) => (
        <div key={result.id} className="search-result">
          <Link onClick={LinkClick} to={`/products/${result.id}`}>
            <div>
              <img src={result.image} alt="" />
              <p>{result.title}</p>
              <p>{result.price}$</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
