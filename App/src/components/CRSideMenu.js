import React from "react";
import "../style/style.css";
import { Link } from "react-router-dom";

function CRSideMenu() {
  return (
    <div className="main">
      <div className="general-structure">
        <aside className="nav sticky">
          <div className="company-name-nav all-caps">
            <Link to="/CRDashboard" className="link-style">
              hexad
            </Link>
          </div>
          <ul className="nav-list-1">
            <li className="nav-list-components-1">Reservations</li>
            <li className="nav-list-components-1">
              <Link to="/CheckIn" className="link-style">Check-in</Link></li>
          </ul>
          <div className="nav-divider"></div>
        </aside>
      </div>
    </div>
  );
}

export default CRSideMenu;
