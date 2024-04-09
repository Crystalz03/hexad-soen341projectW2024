import React from "react";
import "../../../public/assets/css/style.css";

function Main() {
  return (
    <div className="main">
      <div className="general-structure">
        <div className="main-content">
          <div className="title-box">
            <div className="reservation-title">Admin DashBoard</div>
          </div>
          <div className="extra-content"></div>
        </div>
      </div>
    </div>
  );
}
function AdminDashboard() {
  return (
    <div>
      <Main />
    </div>
  );
}

export default AdminDashboard;
