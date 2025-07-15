import { useContext, useEffect, useRef, useState } from "react";
import "../css/SearchBar.css";
import dataContext from "../contexts/dataContext";
import axios from "axios";
import { API_URL } from "../utils/api";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { data, setData, setError } = useContext(dataContext);
  const [inputValue, setInputValue] = useState("");
  const [isInputValid, setIsInputValid] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const skipNextEffect = useRef(false);
  const [typedValue, setTypedValue] = useState("");

  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (skipNextEffect.current) {
      skipNextEffect.current = false;
      return;
    }

    if (typedValue.trim() === "") {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/idioms/suggestions/${encodeURIComponent(
            typedValue.trim()
          )}`
        );
        setSuggestions(response.data.map((item) => item.thanh_ngu_tieng_trung));
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
  }, [typedValue]);

  useEffect(() => {
    if (activeIndex >= 0 && activeIndex < suggestions.length) {
      setInputValue(suggestions[activeIndex]);
    } else {
      setTypedValue(typedValue);
    }
  }, [activeIndex, suggestions]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedIdiom =
      activeIndex >= 0 && activeIndex < suggestions.length
        ? suggestions[activeIndex]
        : typedValue;

    if (!selectedIdiom) {
      setIsInputValid(false);
    } else {
      fetchData(
        `${API_URL}/api/idioms/${encodeURIComponent(inputValue.trim())}`
      );
      setIsInputValid(true);
      navigate(`/idiom/${encodeURIComponent(inputValue.trim())}`);
    }
    setShowDropdown(false);
  };

  const handleSuggestionClick = (word) => {
    skipNextEffect.current = true;
    setInputValue(word);
    setTypedValue(word);
    setIsInputValid(true);
    setActiveIndex(-1);
    setShowDropdown(false);
    fetchData(`${API_URL}/api/idioms/${encodeURIComponent(word)}`);
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
      setActiveIndex((prev) =>
        prev + 1 >= suggestions.length ? suggestions.length - 1 : prev + 1
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? -1 : prev - 1));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0) {
        e.preventDefault();
        const selected =
          activeIndex >= 0 && activeIndex < suggestions.length
            ? suggestions[activeIndex]
            : typedValue;
        handleSuggestionClick(selected);
      }
    } else if (e.key === "Escape") {
      setShowDropdown(false);
      setActiveIndex(-1);
      setInputValue(typedValue); // Reset to typed value on escape
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
          value={
            activeIndex >= 0 && activeIndex < suggestions.length
              ? suggestions[activeIndex]
              : typedValue
          }
          onChange={(e) => {
            const val = e.target.value;
            setInputValue(val);
            setTypedValue(val);
            setIsInputValid(val.trim() !== "");
            setShowDropdown(val.trim() !== "" && suggestions.length > 0);
            setActiveIndex(-1);
          }}
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
          <img src="/images/icon-search.svg" alt="Search" />
        </button>
        {!isInputValid && (
          <span className="search-bar__validation-error">
            Không được để trống!
          </span>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
