import React from "react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "./Home";
import Footer from "./Home";

import "./../style/style.css";

function Browse() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
function Main() {
  return (
    <div className="main">
      <div className="general-structure">
        <aside className="nav sticky">
          <div className="company-name-nav all-caps">hexad</div>
          <ul className="nav-list-1">
            <li className="nav-list-components-1">Sign In/Sign Up</li>
            <li className="nav-list-components-1">About Hexad</li>
            <li className="nav-list-components-1">Reserve</li>
            <li className="nav-list-components-1">
              <Link to="/Cancel">View/Cancel/Modify</Link>
            </li>
          </ul>
          <div className="nav-divider"></div>
          <ul className="nav-list-2">
            <li className="nav-list-components-2">Browse Vehicles</li>
            <li className="nav-list-components-2">Locations</li>
            <li className="nav-list-components-2">Contact Us</li>
          </ul>
          <div className="nav-divider"></div>
        </aside>
        <div className="main-browse-content"></div>
      </div>
    </div>
  );
}

export default Browse;
