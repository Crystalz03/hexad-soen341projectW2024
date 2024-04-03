import React from "react";
import CreateAdminAccount from "../components/AdminAccount";
import "../style/style.css";

function AdminAccount() {
  return (
    <div className="main">
      <div className="general-structure">
        <div className="main-content">
          <div className="title-box">
            <div className="reservation-title">
              Create Admin Account 
            </div>
          </div>
          <div className="extra-content">
            {" "}
            <CreateAdminAccount />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAccount;