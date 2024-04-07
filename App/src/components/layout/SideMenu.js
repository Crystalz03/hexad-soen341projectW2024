import React from "react";
import "../../../public/css/style.css";

import { Link } from "react-router-dom";

export default function SideMenu() {
  return (
    <div>
      <div className="main">
        <div className="general-structure">
          <aside className="nav sticky">
            <div className="company-name-nav all-caps">
              <Link to="/" className = "link-style">hexad</Link>
            </div>
            <ul className="nav-list-1">
               <Link to="/SignUp" className = "link-style">Sign Up</Link>
              <li className="nav-list-components-1">About Hexad</li>
              <li className="nav-list-components-1"><Link to="/Reserve" className = "link-style">Reserve</Link></li>
              <li className="nav-list-components-1"><Link to="/View" className="link-style">View</Link>/<Link to="/Modify" className="link-style">Modify</Link>/<Link to="/DeleteReservationPage" className = "link-style">Delete</Link></li>
            </ul>
            <div className="nav-divider"></div>

            <ul className="nav-list-2">
              <Link to="/Browse" className="link-style">
                Browse Vehicles
              </Link>
              <li className="nav-list-components-2">
                <Link to="/Branches" className = "link-style">Find a Branch</Link></li>
              <li className="nav-list-components-2">Contact Us</li>
              <li className="nav-list-components-2">
                <Link to="/MyAccountPage" className = "link-style">My Account</Link>
              </li>
            </ul>
            <div className="nav-divider"></div>

            <ul className="nav-list-2">
            <Link to="/Reviews" className = "link-style">Leave a Review</Link>
            </ul>
          </aside>
        </div>

      </div>
    </div>
  );
}
