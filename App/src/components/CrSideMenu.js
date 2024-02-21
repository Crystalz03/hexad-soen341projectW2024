import React from "react";
import "../style/style.css";

function CrSideMenu() {
  return (
    <aside className="nav">
      <div className="company-name-nav all-caps">hexad</div>
      <ul className="nav-list-1">
        <li className="nav-list-components-1">View Reservations</li>
        <li className="nav-list-components-1">Create a reservation</li>
        <li className="nav-list-components-1">Browse Vehicles</li>
        <li className="nav-list-components-1">Locations</li>
      </ul>
    </aside>
  );
}

export default CrSideMenu;
