import React from "react";
import CreateAdminAccount from "../../components/adminActions/AdminAccount";
import "../../../public/assets/css/style.css";

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