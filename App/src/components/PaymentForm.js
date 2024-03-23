import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentForm = () => {
  const location = useLocation(); // Use useLocation to access location state
  const totalPrice = location.state?.totalPrice || 'N/A'; // Adjusted to not conflict with prop

  // Your useState hooks and functions here
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    // Implement payment submission logic here
    try {
      // Dummy success logic
    } catch (error) {
      setError('Payment failed. Please try again.');
      console.error('Payment failed:', error);
    }
  };

  // Your JSX return here
  return (
    <div>
      <h2>Payment Form</h2>
      <div>
        <div>Total Price: ${totalPrice}</div>
        <form onSubmit={handlePaymentSubmit}>
          <label>
            Card Number:
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </label>
          <label>
            Expiry Date:
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
