import React from "react";
import "../style/style.css";

function Header() {
  return (
    <header className="header sticky all-caps">
      <div className="motto">Drive the experience, rent the journey</div>
      <div className="company-header all-caps">
        <div className="sun-logo"></div>
        <div className="header-title"> hexad</div>
        <div className="btn-1 ">
          <button className="all-caps sign-in-btn btn-background-color">
            sign in
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
