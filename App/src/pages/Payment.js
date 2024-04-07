import React from "react";
import PaymentForm from "../components/PaymentForm";

function Payment() {
  return (
        <div className="main-content">
          <div className="title-box">
            <div className="check-in-title">Check Out</div>
          </div>
          <PaymentForm/>
        </div>
  );
}

export default Payment;