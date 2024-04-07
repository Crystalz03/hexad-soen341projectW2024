import React from "react";
import CreateAdminAccount from "../components/AdminAccount";
import "../style/style.css";

function AdminAccount() {
  return (
        <div className="main-content">
          <div className="title-box">
            <div className="check-in-title">
              Create Admin Account 
            </div>
          </div>
            <CreateAdminAccount />
        </div>
  );
}

export default AdminAccount;