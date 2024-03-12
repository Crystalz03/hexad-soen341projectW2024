import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ViewReservationForm() {
  const [reservationId, setReservationId] = useState("");
  const [reservationDetails, setReservationDetails] = useState({id:"",
  vehicleID:"",
  customerID:" ",
  pickUpDate:" ",
  returnDate:" ",
  extraEquipment:" ",
  additionalServices: " ",
  total:" ",
});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const callAPI = async () => {
    if (!isFormatValidReservationId(reservationId)) {
        return;
      }
  
      try {
        const response = await fetch(
          `http://localhost:9000/reservations/${reservationId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (response.ok) {
          const data = await response.json();
          setReservationDetails(data.reservation);
        } else {
          setError(response.statusText);
        }
      } catch (error) {
        setError(error.message);
      }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await callAPI();
  };

  const handleChange = (e) => {
    setReservationId(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Reservation ID:
          <input
            type="text"
            value={reservationId}
            placeholder="Enter Reservation ID"
            required
            onChange={handleChange}
          />
        </label>
        <button type="submit">View</button>
      </form>
      {error && <p className="error">{error}</p>}
      {reservationDetails.id && (
        <div>
          <h2>Reservation Details</h2>
          <p>ID: {reservationDetails.id}</p>
          <p>Vehicle ID: {reservationDetails.vehicleID}</p>
          <p>Customer ID: {reservationDetails.customerID}</p>
          <p>Pick Up Date: {reservationDetails.pickUpDate}</p>
          <p>Return Date: {reservationDetails.returnDate}</p>
          <p>Extra Equipment: {reservationDetails.extraEquipment}</p>
          <p>Additional Services: {reservationDetails.additionalServices}</p>
          <p>Total: {reservationDetails.total}</p>
        </div>
      )}
    </div>
  );
}

  