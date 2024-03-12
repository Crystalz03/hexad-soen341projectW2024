import React from "react";
import "../style/style.css";
import { Link } from "react-router-dom";

function AdminSideMenu2() {
  return (
    <aside className="nav sticky">
      <div className="company-name-nav all-caps">hexad</div>
      <ul className="nav-list-1">
        <Link to="/CreateCRAccount"><li className="nav-list-components-1">Create CR Account</li></Link>
        <Link to="/UpdateVehicle"><li className="nav-list-components-1">Update an existing vehicle</li></Link>
        <li className="nav-list-components-1">View/Modify Inventory</li>
        <li className="nav-list-components-1">Schedule</li>
        <li className="nav-list-components-1">Reservations</li>
      </ul>
    </aside>
  );
}
function AdminSideMenu() {
  return (
    <div className="main">
      <div className="general-structure">
        <aside className="nav sticky">
          <div className="company-name-nav all-caps">hexad</div>
          <ul className="nav-list-1">
            <li className="nav-list-components-1">
              <Link to="/CreateCRAccount" className="link-style">
                Create CR account
              </Link>
              /
            </li>
            <li className="nav-list-components-1">
              <Link to="/AdminInventory" className="link-style">
                View/Modify Inventory
              </Link>
            </li>
            <li className="nav-list-components-1">Schedule</li>
            <li className="nav-list-components-1">Reservations</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
export default AdminSideMenu;
