import React from "react";
import "../style/style.css";
import { Link } from "react-router-dom";

function AdminSideMenu2() {
  return (

<div className="main">
<div className="general-structure">
  <aside className="nav sticky">
    <div className="company-name-nav all-caps"><Link to="/" >hexad</Link></div>
    <ul className="nav-list-1">
      <li className="nav-list-components-1">
        <Link to="/SignIn">Sign In</Link>/
        <Link to="/SignUp">Sign Up</Link>
      </li>
      <Link to="/CreateCRAccount"><li className="nav-list-components-1">Create CR Account</li></Link>
        <Link to="/CreateAdminAccount"><li className="nav-list-components-1">Create Admin Account</li></Link>
        <li className="nav-list-components-1">View/Modify Inventory</li>
        <li className="nav-list-components-1">Reservations</li>
    </ul>
    <div className="nav-divider"></div>
    
  </aside>
</div>
</div>



  );
}

export default AdminSideMenu;
