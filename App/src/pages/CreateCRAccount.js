import React from "react";
import CRAccount from '../components/CRAccount';
import "../style/style.css";

function CreateCRAccount() {
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
            <CRAccount />
          </div>
        </div>
      </div>
    </div>
  );
}
export default CreateCRAccount;
