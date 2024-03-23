import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentForm = () => {
  const location = useLocation(); // to access location state
  const totalPrice = location.state?.totalPrice || 'N/A'; 

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();

    // Validate credit card number
    const cardNumberRegex = /^[0-9]{16}$/;
    if (!cardNumberRegex.test(cardNumber)) {
      setError('Invalid credit card number. Please enter a valid 16-digit number.');
      return;
    }

    // Validate expiry date (format MM/YY)
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!expiryDateRegex.test(expiryDate)) {
      setError('Invalid expiry date. Please enter a valid date in MM/YY format.');
      return;
    }

    // Validate CVV (3 digits)
    const cvvRegex = /^[0-9]{3}$/;
    if (!cvvRegex.test(cvv)) {
      setError('Invalid CVV. Please enter a valid 3-digit CVV.');
      return;
    }

    // If all validations pass, proceed with payment submission
    try {
      // Implement payment submission logic here
      setError('Payment successful!');
      // Dummy success logic
    } catch (error) {
      setError('Payment failed. Please try again.');
      console.error('Payment failed:', error);
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
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
