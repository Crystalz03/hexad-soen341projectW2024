import React from 'react';
import { useNavigate } from "react-router-dom";

function ConfirmBookingComp(props){
    const formData = props.formData;
    const navigate = useNavigate();
    const total=0;
    
    if (formData.additionalServices === "accidentInsurance") {
        total+= 100;
      }else if (formData.additionalServices === "roadsideAssistance") {
        total+= 50;
      }else if (formData.additionalServices === "none") {
        total+= 0;
      }
      //adding additional equipment to the total
      if (formData.extraEquipment === "gps") {
        total+= 80;
      }else if (formData.extraEquipment === "childSeat") {
        total+= 120;
      }else if (formData.extraEquipment === "trailer") {
        total+= 200;
      }else if (formData.extraEquipment === "bikeRack") {
        total+= 175;
      }else if (formData.extraEquipment === "none") {
        total+= 0;
      }
    
    const ReservationDuration = (new Date(formData.returnDate) - new Date(formData.pickUpDate))/(1000*60*60*24);
        total +=vehicle.Price*ReservationDuration;

    return(
        <div>
            <h1>Confirm Booking</h1>
            <h2>Vehicle Information</h2>
            <p>Make: {vehicle.Make}</p>
            <p>Model: {vehicle.Model}</p>
            <p>Category: {vehicle.Category}</p>
            <p>Price: {vehicle.Price}</p>
            <h2>Customer Information</h2>
            <p>Name: {customer.Name}</p>
            <p>Email: {customer.Email}</p>
            <p>Phone: {customer.Phone}</p>
            <h2>Reservation Information</h2>
            <p>Pick Up Date: {formData.pickUpDate}</p>
            <p>Return Date: {formData.returnDate}</p>
            <p>Pick Up Location: {formData.pickUpLocation}</p>
            <p>Drop Off Location: {formData.dropOffLocation}</p>
            <p>Additional Services: {formData.additionalServices}</p>
            <p>Extra Equipment: {formData.extraEquipment}</p>
            <p>Total : {vehicle.Price} $ x {ReservationDuration} = {total} $ </p>
            <button onClick={()=>{navigate(`/ConfirmPayment/${vehicleID}/${formData.email}/${formData.pickUpDate}/${formData.returnDate}/${formData.pickUpLocation}/${formData.dropOffLocation}/${formData.additionalServices}/${formData.extraEquipment}/${total}`)}}>Confirm</button>
            <button onClick={()=>{navigate(`/Browse`)}}>Cancel</button>
        </div>
    );
}

export default ConfirmBookingComp;