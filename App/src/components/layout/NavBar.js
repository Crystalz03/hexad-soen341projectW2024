import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SignInPopover from "../authentication/SignInPopover";
import { getUser, getUserRole } from "../userManagement/DisplayUserInfo";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isDropdownOpenAccount, setIsDropdownOpenAccount] = useState(false);
  const [isDropdownOpenReservation, setIsDropdownOpenReservation] =
    useState(false);
  const [isDropdownOpenAccounts, setIsDropdownOpenAccounts] = useState(false);
  const [isDropdownOpenVehicle, setIsDropdownOpenVehicle] = useState(false);
  const [user, setUser] = useState(getUser());
  const [userType, setUserType] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const navigate = useNavigate();

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
      navigate(window.location.pathname);
    }
  }, [user, navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    setSignedIn(false);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="navbar-brand">
          <h2>Drive the experience, rent the journey</h2>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!signedIn && (
              <>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Browse">
                    Browse Vehicles
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Branches">
                    Find A Branch
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownReservation"
                    role="button"
                    onMouseEnter={() => setIsDropdownOpenReservation(true)}
                    onMouseLeave={() => setIsDropdownOpenReservation(false)}
                  >
                    Reservations
                  </a>
                  <ul
                    className={`dropdown-menu ${
                      isDropdownOpenReservation ? "show" : ""
                    }`}
                    aria-labelledby="navbarDropdownReservation"
                    onMouseEnter={() => setIsDropdownOpenReservation(true)}
                    onMouseLeave={() => setIsDropdownOpenReservation(false)}
                  >
                    <li>
                      <a className="dropdown-item" href="/">
                        New Reservation
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/View">
                        View
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/Modify">
                        Modify
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/DeleteReservationPage"
                      >
                        Cancel
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Recommendations">
                    Where to go on your trip?
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/VehicleApplication">
                    Recycle your vehicle with us!
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Reviews">
                    Review
                  </a>
                </li>
                <SignInPopover />
              </>
            )}
            {signedIn && userType === "customer" && (
              <>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Browse">
                    Browse Vehicles
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Branches">
                    Find A Branch
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownReservation"
                    role="button"
                    onMouseEnter={() => setIsDropdownOpenReservation(true)}
                    onMouseLeave={() => setIsDropdownOpenReservation(false)}
                  >
                    Reservations
                  </a>
                  <ul
                    className={`dropdown-menu ${
                      isDropdownOpenReservation ? "show" : ""
                    }`}
                    aria-labelledby="navbarDropdownReservation"
                    onMouseEnter={() => setIsDropdownOpenReservation(true)}
                    onMouseLeave={() => setIsDropdownOpenReservation(false)}
                  >
                     <li>
                      <a className="dropdown-item" href="/">
                        New Reservation
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/View">
                        View
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/Modify">
                        Modify
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/DeleteReservationPage"
                      >
                        Cancel
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Recommendations">
                    Where to go on your trip?
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/VehicleApplication">
                    Recycle your vehicle with us!
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Reviews">
                    Review
                  </a>
                </li>
               
              </>
            )}
            {signedIn && userType === "admin" && (
              <>
                <li className="nav-item">
                  <Link to="/AdminDashboard" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    id="navbarDropdownVehicle"
                    role="button"
                    onMouseEnter={() => setIsDropdownOpenVehicle(true)}
                    onMouseLeave={() => setIsDropdownOpenVehicle(false)}
                  >
                    Vehicles
                  </a>
                  <ul
                    className={`dropdown-menu ${
                      isDropdownOpenVehicle ? "show" : ""
                    }`}
                    aria-labelledby="navbarDropdownVehicle"
                    onMouseEnter={() => setIsDropdownOpenVehicle(true)}
                    onMouseLeave={() => setIsDropdownOpenVehicle(false)}
                  >
                    <li>
                      <Link to="/Vehicle" className="dropdown-item">
                        Add New Vehicle
                      </Link>
                    </li>
                    <li>
                      <Link to="/Inventory" className="dropdown-item">
                        View/Modify Inventory
                      </Link>
                    </li>
                    <li>
                      <Link to="/ApplicationInventory" className="dropdown-item">
                        View/Delete Selling Applications
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    id="navbarDropdownAccounts"
                    role="button"
                    onMouseEnter={() => setIsDropdownOpenAccounts(true)}
                    onMouseLeave={() => setIsDropdownOpenAccounts(false)}
                  >
                    Account
                  </a>
                  <ul
                    className={`dropdown-menu ${
                      isDropdownOpenAccounts ? "show" : ""
                    }`}
                    aria-labelledby="navbarDropdownAccounts"
                    onMouseEnter={() => setIsDropdownOpenAccounts(true)}
                    onMouseLeave={() => setIsDropdownOpenAccounts(false)}
                  >
                    <li>
                      <Link to="/BrowseAccounts" className="dropdown-item">
                        View All Accounts
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/CreateAdminAccount"
                        className="dropdown-item"
                      >
                        Create Admin Account
                      </Link>
                    </li>
                    <li>
                      <Link to="/CreateCRAccount" className="dropdown-item">
                        Create CR Account
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            )}
            {signedIn && userType === "customer_representative" && (
              <>
                <li className="nav-item">
                  <Link to="/CRDashboard" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/Browse" className="nav-link">
                    Browse Vehicles
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/NewCustomer" className="nav-link">
                    Create Customer Account
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/CheckIn" className="nav-link">
                    Check In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/CheckOut" className="nav-link">
                    Check Out
                  </Link>
                </li>
              </>
            )}
          </ul>
          {signedIn &&   (
            <div
              className="dropdown"
              onMouseEnter={() => setIsDropdownOpenAccount(true)}
              onMouseLeave={() => setIsDropdownOpenAccount(false)}
            >
              <img
                src={require("../../../public/assets/images/account.png")
                  .default}
                alt="account"
                style={{ height: "40px" }}
              />
              <ul
                className={`dropdown-menu ${
                  isDropdownOpenAccount ? "show" : ""
                }`}
              >
                <li>
                  <Link to="/MyAccountPage" style={{ textDecoration: "none" }}>
                    <a className="dropdown-item">My Account</a>
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item" onClick={handleSignOut}>
                    Sign Out
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
