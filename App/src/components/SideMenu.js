import React from "react";
import "../style/style.css";

function SideMenu() {
  return (
    <aside className="nav">
      <div className="company-name-nav all-caps">hexad</div>
      <ul className="nav-list-1">
        <li className="nav-list-components-1">Sign In/Sign Up</li>
        <li className="nav-list-components-1">About Hexad</li>
        <li className="nav-list-components-1">Reserve</li>
        <li className="nav-list-components-1">View/Modify</li>
      </ul>
      <div className="nav-divider"></div>
      <ul className="nav-list-2">
        <li className="nav-list-components-2">Browse Vehicles</li>
        <li className="nav-list-components-2">Locations</li>
        <li className="nav-list-components-2">Contact Us</li>
      </ul>
      <div className="nav-divider"></div>
    </aside>
  );
}

export default SideMenu;
