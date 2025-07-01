const changeBodyFontFamily = (e) => {
  switch (e.target.dataset.fontFamily.toLowerCase()) {
    case "sans serif":
      document.body.style.fontFamily = "var(--ff-sans-sefir)";
      break;
    case "serif":
      document.body.style.fontFamily = "var(--ff-sefir)";
      break;
    case "mono":
      document.body.style.fontFamily = "var(--ff-mono)";
      break;
  }
};

export default changeBodyFontFamily;
