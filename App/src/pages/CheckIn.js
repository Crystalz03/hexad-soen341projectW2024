import React from "react";
import "./../style/style.css";
import CheckInForm from "../components/CheckInForm";

function CheckIn() {
  return (
        <div className="main-content" >
            <div className="check-in-title">Customer Check-in</div>
            <CheckInForm />
        </div>
  );
}

export default CheckIn;
