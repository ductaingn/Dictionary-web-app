import changeBodyFontFamily from "../utils/changeBodyFontFamily";
import "../css/FontFamilySelect.css";
import { useState, useEffect, useRef } from "react";

const FontFamilySelect = () => {
  const [selectValue, setSelectValue] = useState("sans serif");
  const [open, setOpen] = useState(false);

  const menuRef = useRef();

  //handles click outside menu and closes menu if click was outside
  useEffect(() => {
    let clickHandler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", clickHandler);

    return document.removeEventListener("click", clickHandler);
  });

  return (
    <div className="header__select select" ref={menuRef}>
      <div
        className="select__btn"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <span className="select__btn-text">{selectValue}</span>
        <img
          className="select__btn-icon"
          src="\images\icon-arrow-down.svg"
          alt=""
        />
      </div>

      <ul
        className={`select__options ${open ? "active" : ""}`}
        onClick={(e) => {
          if (e.target.tagName === "LI") {
            setSelectValue(e.target.textContent);
            changeBodyFontFamily(e);
          }
          setOpen(!open);
        }}
      >
        <li className="select__option" data-font-family="sans serif">
          Sans serif
        </li>
        <li className="select__option" data-font-family="serif">
          serif
        </li>
        <li className="select__option" data-font-family="mono">
          mono
        </li>
      </ul>
    </div>
  );
};

export default FontFamilySelect;
