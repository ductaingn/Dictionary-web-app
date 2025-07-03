import { Link } from "react-router-dom";
import "../css/Sidebar.css";

const Sidebar = ({ visible, onClick }) => {
  return (
    <div className={visible ? "header__sidebar open" : "header__sidebar"}>
      <nav className="">
        <ul>
          <li>
            <Link to="/" onClick={onClick}>
              Tra cứu thành ngữ
            </Link>
          </li>
          <li>
            <Link to="/categorize-page" onClick={onClick}>
              Phân loại thành ngữ
            </Link>
          </li>
          <li>
            <Link to="/blog-page" onClick={onClick}>
              Phụ lục
            </Link>
          </li>
        </ul>
      </nav>

      {/* Half-circle Close Button */}
      <button
        className="sidebar__close-btn"
        onClick={onClick}
        aria-label="Close sidebar"
      >
        <img src="/images/icon-arrow-left.svg" />
      </button>
    </div>
  );
};

export default Sidebar;
