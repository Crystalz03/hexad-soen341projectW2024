import React from "react";
import CheckOutForm from "../../components/checkInOut/CheckOutForm";

function CheckOut() {
  return (
        <div className="main-content">
          <div className="title-box">
            <div className="check-in-title">Customer Check Out</div>
          </div>
            <CheckOutForm />
        </div>
  );
}

export default CheckOut;
