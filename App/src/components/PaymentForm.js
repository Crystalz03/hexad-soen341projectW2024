import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const PaymentForm = () => {
  const location = useLocation(); // to access location state
  const totalPrice = parseFloat(location.state?.totalPrice) || 0; //Making sure totalPrice is always a number

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

    // Validate credit card number
    const cardNumberRegex = /^[0-9]{16}$/;
    if (!cardNumberRegex.test(cardNumber)) {
      setError(
        "Invalid credit card number. Please enter a valid 16-digit number."
      );
      return;
    }

    // Validate expiry date (format MM/YY)
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!expiryDateRegex.test(expiryDate)) {
      setError(
        "Invalid expiry date. Please enter a valid date in MM/YY format."
      );
      return;
    }

    // Validate CVV (3 digits)
    const cvvRegex = /^[0-9]{3}$/;
    if (!cvvRegex.test(cvv)) {
      setError("Invalid CVV. Please enter a valid 3-digit CVV.");
      return;
    }

    try {
      setTimeout(() => {
        setError(""); // Clear any existing errors

        alert(
          "Payment successful! $500 was returned to the customer's credit card."
        );
      }, 1000);

      // If payment is successful, update paid status in the backend
      const response = await fetch(
        `http://localhost:9000/reservations/pay/${reservationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paid: true, // Set paid to true
          }),
        }
      );

      if (response.ok) {
        // Reservation marked as paid successfully
        alert("Payment successful! Reservation marked as paid.");
      } else {
        // Handle error in updating paid status
        setError("Failed to update reservation status. Please try again.");
        console.error(
          "Failed to update reservation status:",
          response.statusText
        );
      }
    } catch (error) {
      // Handle any other errors
      setError("Payment failed. Please try again.");
      console.error("Payment processing error:", error);
    }
  };

  return (
    <div>
      <h2>Payment Form</h2>
      <div>
        <div>Total Price: ${totalPrice}</div>
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
          <label>
            Expiry Date (format: MM/YY):
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </label>
          <label>
            CVV:
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
          </label>
          <button type="submit">Pay Now</button>
          {error && <div style={{ color: "red" }}>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
