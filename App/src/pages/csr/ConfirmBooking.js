import { useParams } from "react-router-dom";
import React from "react";

import ConfirmBookingComp from "../../components/checkInOut/ConfirmBookingComp";

function ConfirmBooking() {
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
  };
  //<button onClick={()=>{navigate(`/ConfirmBooking/${vehicleID}/${formData.email}/${formData.pickUpDate}/${formData.returnDate}/${formData.pickUpLocation}/${formData.dropOffLocation}/${formData.additionalServices}/${formData.extraEquipment}`)}}>Continue</button>

  return (
    <div className="main-content">
        <div className="title-box" style={{alignItems: 'center', justifyContent: 'center'}}>
          <div className="check-in-title">Confirm Booking</div>
        </div>
            <ConfirmBookingComp formData={formData} />
      </div>
  );
}

export default ConfirmBooking;
