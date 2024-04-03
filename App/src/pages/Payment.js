import React from "react";
import PaymentForm from "../components/PaymentForm";

function Payment() {
  return (
    <div className="main">
      <div className="general-structure">
        <div className="main-content">
          <div className="title-box">
            <div className="reservation-title">Check Out</div>
          </div>
          <div className="extra-content">
          <PaymentForm/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;