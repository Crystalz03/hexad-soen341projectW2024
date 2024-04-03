import React from "react";
import SignUpFrom from "../components/SignUpForm";

function CreateUser() {
    return (
      <div className="main">
        <div className="general-structure">
          <div className="main-content">
            <div className="title-box">
              <div className="reservation-title">Create a customer account</div>
            </div>
            <div className="extra-content"> <SignUpFrom /></div>
          </div>
        </div>
      </div>
    );
  }

export default CreateUser;