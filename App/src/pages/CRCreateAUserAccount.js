import React from "react";
import SignUpFrom from "../components/SignUpForm";
import { Link } from "react-router-dom";

function CreateUser() {
    return (
          <div className="main-content">
            <div className="title-box">
              <div className="check-in-title">Create a Customer Account</div>
            </div>
            <div className="base-form" style={{height: '700px'}}> <SignUpFrom /></div>
          </div>
    );
  }

export default CreateUser;