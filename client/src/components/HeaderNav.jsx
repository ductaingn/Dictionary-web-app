import "../css/HeaderNav.css";
import FontFamilySelect from "./FontFamilySelect";
import Separator from "./Separator";
import DarkModeToggle from "./DarkModeToggle";

const HeaderNav = () => {
  return (
    <nav className="header__nav">
      <FontFamilySelect />
      {/* <Separator /> */}
      {/* <DarkModeToggle /> */}
    </nav>
  );
};

export default HeaderNav;
