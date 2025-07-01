import "../css/DarkModeToggle.css";
import darkMode from "../utils/darkMode.js";
import isDarkThemePrefered from "../utils/isDarkThemePrefered.js";
import { useEffect } from "react";

const DarkModeToggle = () => {
  useEffect(() => {
    darkMode(isDarkThemePrefered());
  }, [isDarkThemePrefered]);

  return (
    <label className="header__dark-mode-toggle">
      <input
        className="header__dark-mode-checkbox"
        type="checkbox"
        defaultChecked={isDarkThemePrefered()}
        onInput={(e) => darkMode(e.target.checked)}
      />
      <span className="header__dark-mode-check"></span>
      <svg
        className="header__dark-mode-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 22 22"
      >
        <path
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
        />
      </svg>
    </label>
  );
};

export default DarkModeToggle;
