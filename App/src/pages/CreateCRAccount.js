import React from "react";
import CRAccount from '../components/CRAccount';
import "../style/style.css";

function CreateCRAccount() {
  return (
        <div className="main-content">
          <div className="title-box">
            <div className="check-in-title">
              Create Admin Account 
            </div>
          </div>
            <CRAccount />
        </div>
  );
}
export default CreateCRAccount;
