import React from "react";
import "../style/style.css";
import { Link } from "react-router-dom";


function Header() {
  return (
    //I'm trying to change the sign in button to an icon if the user is signed in

    <header className="header sticky all-caps">
      <div className="motto">Drive the experience, rent the journey</div>
      <div className="company-header all-caps">
        <div className="sun-logo"></div>
        <div className="header-title"> hexad</div>
        <div className="btn-1 ">
        <Link to="/SignIn"><button className="all-caps sign-in-btn btn-background-color">
         sign in
          </button></Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
