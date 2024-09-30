import "./Search.scss";
import { openSearch } from "../../store/features/searchSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useRef, useState } from "react";
import SearchResult from "./SearchResult";

import { motion, AnimatePresence } from "framer-motion";

const Search = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.search.isOpen);
  const inputRef = useRef<HTMLInputElement>(null);

  const [input, setInput] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const resetInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      setInput("");
      setResults([]);
    }
  };

  const fetchData = (value: string) => {
    if (value.trim() === "") {
      setResults([]);
      return;
    }

    return fetch("https://fakestoreapi.com/products/")
      .then((response) => response.json())
      .then((data) => {
        const resultData = data.filter((item: any) => {
          return (
            item &&
            item.title &&
            item.title.toLowerCase().includes(value.toLowerCase())
          );
        });
        setResults(resultData);
      });
  };

  const handleChange = (value: string): void => {
    setInput(value);
    fetchData(value);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -15, height: 0 }}
            transition={{ duration: 0.2 }}
            className="container"
          >
            <section className="searchbar">
              <input
                ref={inputRef}
                placeholder="Search products"
                value={input}
                onChange={(e) => handleChange(e.target.value)}
                formNoValidate
              />
              <p className="search-clear-btn" onClick={resetInput}>
                x
              </p>
              <div className="search-clear">
                <p onClick={() => dispatch(openSearch())}>close</p>
              </div>

              <SearchResult
                setResults={setResults}
                setInput={setInput}
                results={results}
                input={input}
              />
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Search;
