import React from "react";
import "../style/style.css";
import { Link } from "react-router-dom";

export default function SideMenu() {
  return (
    <div className="main">
      <div className="general-structure">
        <aside className="nav sticky">
          <div className="company-name-nav all-caps">hexad</div>
          <ul className="nav-list-1">
            <li className="nav-list-components-1">
              <Link to="/SignIn">Sign In</Link>/
              <Link to="/SignUp">Sign Up</Link>
            </li>
            <li className="nav-list-components-1">About Hexad</li>
            <li className="nav-list-components-1">Reserve</li>
            <li className="nav-list-components-1"><Link to="/ReservationDisplay">View</Link>/Modify</li>
          </ul>
          <div className="nav-divider"></div>
          <ul className="nav-list-2">
            <li className="nav-list-components-2">Browse Vehicles</li>
            <li className="nav-list-components-2">Locations</li>
            <li className="nav-list-components-2">Contact Us</li>
            <li className="nav-list-components-2">
              <Link to="/DeleteReservationPage">Delete</Link>
            </li>
            <li className="nav-list-components-2">
              <Link to="/MyAccountPage">My Account</Link>
            </li>
            <li className="nav-list-components-2">
            <Link to="/AddVehicle">Add a vehicle</Link>
            </li>
          </ul>
          <div className="nav-divider"></div>
        </aside>
      </div>
    </div>
  );
}
