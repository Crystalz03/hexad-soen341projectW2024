import React from "react";
import "./../style/style.css";
import CheckInForm from "../components/CheckInForm";

function CheckIn() {
  return (
        <div className="main-content" >
            <div className="title-box">
            <div className="check-in-title">Customer Check-in</div>
          </div>
           <div style={{height: 'auto'}}> <CheckInForm /> </div>
        </div>
  );
}

export default CheckIn;
