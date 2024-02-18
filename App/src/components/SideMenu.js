import React, { useState } from "react";
import "../style/SideMenu.css";

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`side-menu ${isOpen ? "open" : ""}`}>
      <button className="toggle-btn" onClick={toggleMenu}>
        Toggle Menu
      </button>
      <ul className="menu-items">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>
  );
}

export default SideMenu;
