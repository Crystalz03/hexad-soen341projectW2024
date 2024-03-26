import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const PaymentForm = () => {
  const location = useLocation();
  const { totalPrice, reservationId } = location.state || {};

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const [vehicleID, setVehicleID] = useState("");
  const [reservationDetails, setReservationDetails] = useState(null);

  // useEffect(() => {
  //   const fetchReservationDetails = async () => {
  //     try {
  //       const reservationResponse = await fetch(`http://localhost:9000/reservations/${reservationId}`);
  //       if (!reservationResponse.ok) {
  //         throw new Error('Failed to fetch reservation details.');
  //       }
  //       const reservationData = await reservationResponse.json();
  //       setReservationDetails(reservationData);
  //       setVehicleID(reservationData.vehicleID);
  //     } catch (error) {
  //       console.error('Error fetching reservation details:', error);
  //     }
  //   };
  //   fetchReservationDetails();
  // }, [reservationId]);

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
  
    if (totalPrice <= 0) {
      setError("Total price must be greater than $0 to proceed with payment.");
      return;
    }
  
    const cardNumberRegex = /^[0-9]{16}$/;
    if (!cardNumberRegex.test(cardNumber)) {
      setError("Invalid credit card number. Please enter a valid 16-digit number.");
      return;
    }
  
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!expiryDateRegex.test(expiryDate)) {
      setError("Invalid expiry date. Please enter a valid date in MM/YY format.");
      return;
    }
  
    const cvvRegex = /^[0-9]{3}$/;
    if (!cvvRegex.test(cvv)) {
      setError("Invalid CVV. Please enter a valid 3-digit CVV.");
      return;
    }

    try {

      setTimeout(() => {
        setError(''); // Clear any existing errors

        alert("Payment successful! $500 was returned to the customer's credit card.");

      }, 1000);
    }catch(error){
    
        setError('Payment failed. Please try again.');
        console.error('Payment processing error:', error);
    }
    // try {
    //   // Ensure vehicleID is set
    //   if (!vehicleID) {
    //     throw new Error('Vehicle ID is not set.');
    //   }
  
    //   const updateResponse = await fetch(`http://localhost:9000/reservations/${reservationId}`, {
    //     method: "PUT",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ paid: true, vehicleID }),
    //   });
  
    //   if (!updateResponse.ok) {
    //     throw new Error('Failed to update reservation status.');
    //   }
  
    //   alert("Payment successful! Reservation marked as paid.");
    // } catch (error) {
    //   setError("Payment failed. Please try again.");
    //   console.error("Payment processing error:", error);
    // }
  };
  

  return (
    <div>
      <h2>Payment Form</h2>
      <div>Total Price: ${totalPrice.toFixed(2)} </div>
      <form onSubmit={handlePaymentSubmit}>
        <label>
          Card Number (16 digits):
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Expiry Date (format: MM/YY):
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          CVV:
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Pay Now</button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
    </div>
  );
};

export default PaymentForm;
