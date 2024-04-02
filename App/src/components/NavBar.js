import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Link } from "react-router-dom";
import SignInPopover from "../components/SignInPopover";
import { useSelector } from "react-redux";

function Navbar() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <div className="navbar-brand">
          <h2>Drive the experience, rent the journey</h2>
        </div>

        <div
          className={`collapse navbar-collapse`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/Browse"
                id="navbarDropdown"
                role="button"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Browse Vehicles
              </a>
              <ul
                className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}
                aria-labelledby="navbarDropdown"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Cars
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    SUVs
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Vans
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Trucks
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Branches">
                Find A Branch
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Contact Us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Reviews">
                Review
              </a>
            </li>
          </ul>
           {/* Conditional rendering based on authentication state */}
           {isAuthenticated ? (
            <img src="" alt="Account" />
          ) : (
            
            <SignInPopover />
         
          )}
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
