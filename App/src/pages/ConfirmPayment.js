import { useParams } from "react-router-dom";
import React from "react";
import ConfirmPaymentForm from "../components/ConfirmPaymentForm";

function ConfirmPayment() {
  const params = useParams();
  const formData = {
    vehicleID: params.vehicleID,
    email: params.email,
    pickUpDate: params.pickUpDate,
    returnDate: params.returnDate,
    pickUpLocation: params.pickUpLocation,
    dropOffLocation: params.dropOffLocation,
    additionalServices: params.additionalServices,
    extraEquipment: params.extraEquipment,
    total: params.total,
  };

  return (
    <div>
      <div className="main">
        <div className="general-structure">
          <div className="main-content">
            <div className="title-box">
              <div className="reservation-title">Start a Reservation</div>
            </div>
            <div
              className="extra-content"
              style={{ height: "300px", width: "200px", padding: "20px" }}
            >
              <ConfirmPaymentForm formData={formData} />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPayment;
