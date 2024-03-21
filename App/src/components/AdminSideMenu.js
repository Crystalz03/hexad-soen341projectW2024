import React from "react";
import "../style/style.css";
import { Link } from "react-router-dom";

function AdminSideMenu() {
  return (
    <div className="main">
      <div className="general-structure">
        <aside className="nav sticky">
          <div className="company-name-nav all-caps">
            <Link to="/AdminDashboard" className="link-style">
              hexad
            </Link>
          </div>
          <ul className="nav-list-1">
            <Link to="/CreateCRAccount" className="link-style">
              <li className="nav-list-components-1">Create CR Account</li>
            </Link>
            <Link to="/CreateAdminAccount" className="link-style">
              <li className="nav-list-components-1">Create Admin Account</li>
            </Link>
            <Link to="/BrowseAccounts" className="link-style">
              <li className="nav-list-components-1">Browse Accounts</li>
            </Link>
            <li className="nav-list-components-1">
              <Link to="/Vehicle" className="link-style">
                Add A New Vehicle
              </Link>
            </li>
            <li className="nav-list-components-1">
              <Link to="/UpdateVehicle" className="link-style">
              Update an existing vehicle
              </Link>
            </li>
            <li className="nav-list-components-1">
              <Link to="/Inventory" className="link-style">
                View
              </Link>
              /Modify Inventory
            </li>
            <li className="nav-list-components-1">Reservations</li>
          </ul>
          <div className="nav-divider"></div>
        </aside>
      </div>
    </div>
  );
}

export default AdminSideMenu;
