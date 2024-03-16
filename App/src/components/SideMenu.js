import React from "react";
import "../style/style.css";

import { Link } from "react-router-dom";

export default function SideMenu() {
  return (
    <div>
      <div className="main">
        <div className="general-structure">
          <aside className="nav sticky">
            <div className="company-name-nav all-caps">
              <Link to="/">hexad</Link>
            </div>
            <ul className="nav-list-1">
              <li className="nav-list-components-1">
                <Link to="/SignIn">Sign In</Link>/
                <Link to="/SignUp">Sign Up</Link>
              </li>
              <li className="nav-list-components-1">About Hexad</li>
              <li className="nav-list-components-1"><Link to="/Reserve">Reserve</Link></li>
              <li className="nav-list-components-1">View/Modify/<Link to="/DeleteReservationPage">Delete</Link></li>
            </ul>
            <div className="nav-divider"></div>

            <ul className="nav-list-2">
              <Link to="/Browse" className="link-style">
                Browse Vehicles
              </Link>
              <li className="nav-list-components-2">Locations</li>
              <li className="nav-list-components-2">Contact Us</li>
              <li className="nav-list-components-2">
                <Link to="/MyAccount">My Account</Link>
              </li>
            </ul>
            <div className="nav-divider"></div>
          </aside>
        </div>

      </div>
    </div>
  );
}
