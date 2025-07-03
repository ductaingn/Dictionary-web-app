import "../css/Header.css";
import HeaderNav from "./HeaderNav";
import Logo from "./Logo";
import Sidebar from "./Sidebar";
import { useState } from "react";

const Header = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => setSidebarVisible((prev) => !prev);

  return (
    <header className="header">
      <div className="header__container">
        <Logo onClick={toggleSidebar} />
        <p className="header__page_website_name">Từ điển thành ngữ tiếng Hán</p>
        <HeaderNav />

        <Sidebar
          visible={sidebarVisible}
          onClick={() => setSidebarVisible(false)}
        />

        {sidebarVisible && (
          <div className="overlay" onClick={() => setSidebarVisible(false)} />
        )}
      </div>
    </header>
  );
};

export default Header;
