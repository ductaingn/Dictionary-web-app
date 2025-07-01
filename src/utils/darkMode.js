const darkMode = (isDarkModeEnabled) => {
  isDarkModeEnabled
    ? document.body.classList.add("dark-mode")
    : document.body.classList.remove("dark-mode");
};

export default darkMode;
