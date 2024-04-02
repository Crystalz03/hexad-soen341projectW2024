import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import SignInPopover from "../components/SignInPopover";
import { useSelector } from "react-redux";
import { getUser, getUserRole } from "./DisplayUserInfo";
import { Link } from "react-router-dom";

function Navbar() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [isDropdownOpenAccount, setIsDropdownOpenAccount] = useState(false);
  const [isDropdownOpenBrowse, setIsDropdownOpenBrowse] = useState(false);
  const [user, setUser] = useState(getUser());
  const [userType, setUserType]=useState('');
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setUserType(getUserRole(user.id)); // Use user.id directly
    }
  }, [user]);

  const handleMouseEnterAccount = () => {
    setIsDropdownOpenAccount(true);
  };

  const handleMouseLeaveAccount = () => {
    setIsDropdownOpenAccount(false);
  };

  const handleMouseEnterBrowse = () => {
    setIsDropdownOpenBrowse(true);
  };

  const handleMouseLeaveBrowse = () => {
    setIsDropdownOpenBrowse(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <div className="navbar-brand">
          <h2>Drive the experience, rent the journey</h2>
        </div>

        <div className={`collapse navbar-collapse`}>
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
                id="navbarDropdownBrowse"
                role="button"
                onMouseEnter={handleMouseEnterBrowse}
                onMouseLeave={handleMouseLeaveBrowse}
              >
                Browse Vehicles
              </a>
              <div
                className={`dropdown-menu ${isDropdownOpenBrowse ? 'show' : ''}`}
                onMouseEnter={handleMouseEnterBrowse}
                onMouseLeave={handleMouseLeaveBrowse}
              >
                <a className="dropdown-item" href="#">
                  Cars
                </a>
                <a className="dropdown-item" href="#">
                  SUVs
                </a>
                <a className="dropdown-item" href="#">
                  Vans
                </a>
                <a className="dropdown-item" href="#">
                  Trucks
                </a>
              </div>
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
              <a className="nav-link" href="#">
                Review
              </a>
            </li>
          </ul>
          {signedIn ? (
            <div
              className="dropdown"
              onMouseEnter={handleMouseEnterAccount}
              onMouseLeave={handleMouseLeaveAccount}
            >
              <img
                src={require("./../../public/assets/images/account.png").default}
                alt="account"
                style={{ height: "40px" }}
              />
              <div
                className={`dropdown-menu ${isDropdownOpenAccount ? 'show' : ''}`}
              >
                {/* Dropdown content */}
                <Link to="/MyAccountPage"><a className="dropdown-item">My Account</a></Link>
                <a className="dropdown-item">Sign Out</a>
              </div>
            </div>
          ) : (
            <SignInPopover />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
