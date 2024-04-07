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
    <div className="main-content">
      <div className="title-box">
        <div className="check-in-title">Confirm Payment</div>
          </div>
              <ConfirmPaymentForm formData={formData} />
        </div>
  );
}

export default ConfirmPayment;
