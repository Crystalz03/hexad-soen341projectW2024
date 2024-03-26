import React, { useState, useEffect } from "react";
import "../style/style.css";
import { Link, useNavigate } from "react-router-dom";


function Header() {
  const [signedIn, setSignedIn] = useState(false);
  const navigate= useNavigate();

  // useEffect to check if user is signed in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setSignedIn(false);
    navigate("/");
  };

  return (
    <header className="header sticky all-caps">
      <div className="motto">Drive the experience, rent the journey</div>
      <div className="company-header all-caps">
        <div className="sun-logo"></div>
        <div className="header-title"> hexad</div>
        <div className="btn-1 ">
          {signedIn ? (
            <button className="all-caps sign-in-btn btn-background-color" onClick={handleSignOut}>
              Sign Out
            </button>
          ) : (
            <Link to="/SignIn">
              <button className="all-caps sign-in-btn btn-background-color">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
