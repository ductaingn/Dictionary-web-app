import { useContext, useEffect, useRef, useState } from "react";
import "../css/SearchBar.css"
import dataContext from "../contexts/dataContext";
import axios from "axios";

const SearchBar = () => {
  const { data, setData, setError } = useContext(dataContext);
  const [inputValue, setInputValue] = useState("");
  const [isInputValid, setIsInputValid] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const skipNextEffect = useRef(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (skipNextEffect.current) {
      skipNextEffect.current = false;
      return;
    }

    if (inputValue.trim() === "") {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(
          `https://api.datamuse.com/sug?s=${inputValue.trim()}`
        );
        setSuggestions(response.data.map((item) => item.word));
        setShowDropdown(true);
        setActiveIndex(-1);
      } catch (err) {
        console.error("Suggestion fetch error:", err.message);
        setSuggestions([]);
        setShowDropdown(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [inputValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue || inputValue.length === 0) {
      setIsInputValid(false);
    } else {
      fetchData(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue
          .trim()
          .toLowerCase()}`
      );
      setIsInputValid(true);
    }
    setShowDropdown(false);
  };

  const handleSuggestionClick = (word) => {
    skipNextEffect.current = true;
    setInputValue(word);
    setShowDropdown(false);
    fetchData(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word.trim().toLowerCase()}`
    );
  };

  const fetchData = (url) => {
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
        setError(null);
      })
      .catch((err) => setError(err.message));
  };

  const handleKeyDown = (e) => {
    if (!showDropdown || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev <= 0 ? suggestions.length - 1 : prev - 1
      );
    } else if (e.key === "Enter") {
      if (activeIndex >= 0) {
        e.preventDefault();
        handleSuggestionClick(suggestions[activeIndex]);
      }
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  return (
    <div className="search-bar__container">
      <form className="search-bar__form" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className={`search-bar ${
            isInputValid ? "" : "search-bar--invalid-input"
          }`}
          placeholder="Nhập để tra cứu…"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setShowDropdown(suggestions.length > 0)}
          onKeyDown={handleKeyDown}
        />
        {showDropdown && (
          <ul className="search-bar__dropdown">
            {suggestions.map((word, index) => (
              <li
                key={index}
                className={`search-bar__dropdown-item ${
                  index === activeIndex ? "active" : ""
                }`}
                onMouseDown={() => handleSuggestionClick(word)} // use onMouseDown to avoid blur
              >
                {word}
              </li>
            ))}
          </ul>
        )}
        <button className="search-bar__submit-btn" type="submit">
          <img src="./images/icon-search.svg" alt="Search" />
        </button>
        {!isInputValid && (
          <span className="search-bar__validation-error">
            Whoops, can't be empty…
          </span>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
