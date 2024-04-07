import React, { useState, useEffect } from "react";
import { useLocation} from "react-router-dom";

const PaymentForm = () => {
  const location = useLocation();
  const { totalPrice, reservationId } = location.state || {};

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");

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
      

        // Send PUT request to update payment status
        const response = await fetch(`http://localhost:9000/reservations/pay/${reservationId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ paid: "true" })
        });

        if (response.ok) {
          // Payment successful
          alert("Payment successful! $500 was returned to the customer's credit card.");
          
        } else {
          setError('Payment failed. Please try again.');
          console.error('Payment failed:', response.statusText);
        }
      }
     catch (error) {
      setError('Payment failed. Please try again.');
      console.error('Payment processing error:', error);
    }
  };

  return (
    <div >
      <h2>Payment Form</h2>
      <div>Total Price: ${totalPrice.toFixed(2)} </div>
      <div>Reservation ID: {reservationId}</div> <br/>
   
      <form onSubmit={handlePaymentSubmit} className="base-form">
        <div>
        <label>
          Card Number (16 digits) {' '}
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
            
          />
        </label>
        </div>
        <div>
        <label>
          Expiry Date (format: MM/YY) {' '}
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
            
          />
        </label>
        </div>
        <div>
        <label>
          CVV {' '}
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />
        </label>
        </div>
        <button style={{width: '50%'}} type="submit">Pay Now</button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
    </div>
  );
};

export default PaymentForm;
