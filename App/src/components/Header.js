import React from "react";
import "../style/Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <Link to="/SignUp">
        <button>Sign Up</button>
      </Link>
      <Link to="/SignIn">
        <button>Sign In</button>
      </Link>
    </div>
  );
}

export default Header;
