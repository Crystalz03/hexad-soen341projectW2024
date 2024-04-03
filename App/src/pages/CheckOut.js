import React from "react";
import CheckOutForm from "../components/CheckOutForm";

function CheckOut() {
  return (
    <div className="main">
      <div className="general-structure">
        <div className="main-content">
          <div className="title-box">
            <div className="reservation-title">Check Out</div>
          </div>
          <div className="extra-content" style={{height:"300px"}}>
            <CheckOutForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;