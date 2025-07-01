import { Link } from "react-router-dom";
import "../css/Logo.css";

const Logo = ({ onClick }) => {
  return (
    <button className="header__logo" onClick={onClick}>
      <img src="" alt="" />
    </button>
  );
};

export default Logo;
