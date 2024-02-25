import React from "react";
import "../style/style.css";

function AdminSideMenu() {
  return (
    <aside className="nav">
      <div className="company-name-nav all-caps">hexad</div>
      <ul className="nav-list-1">
        <li className="nav-list-components-1">Create CR Account</li>
        <li className="nav-list-components-1">View/Modify Inventory</li>
        <li className="nav-list-components-1">Schedule</li>
        <li className="nav-list-components-1">Reservations</li>
      </ul>
    </aside>
  );
}

export default AdminSideMenu;
