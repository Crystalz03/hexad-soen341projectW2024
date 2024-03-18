import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CheckoutForm = () => {
  const [reservationId, setReservationId] = useState('');
  const [originalPrice, setOriginalPrice] = useState(0);
  const [damages, setDamages] = useState({
    scratch: false,
    dent: false,
    brokenMirror: false,
    flatTire: false
  });
  const [totalPrice, setTotalPrice] = useState(0);

  const damagePrices = {
    scratch: 50,
    dent: 100,
    brokenMirror: 150,
    flatTire: 80
  };

  const handleDamageChange = (damage) => {
    setDamages({
      ...damages,
      [damage]: !damages[damage]
    });
  };

  const calculateTotalPrice = () => {
    let total = originalPrice;
    for (const damage in damages) {
      if (damages[damage]) {
        total += damagePrices[damage];
      }
    }
    setTotalPrice(total);
  };

  const handleReservationIdChange = (event) => {
    setReservationId(event.target.value);
  };

  const handleOriginalPriceChange = (event) => {
    setOriginalPrice(parseFloat(event.target.value));
  };

  return (
    <div>
      <h2>Checkout Form</h2>
      <div>
        <label>
          Reservation ID:
          <input
            type="text"
            value={reservationId}
            onChange={handleReservationIdChange}
          />
        </label>
      </div>
      <div>
        <label>
          Original Price:
          <input
            type="number"
            value={originalPrice}
            onChange={handleOriginalPriceChange}
          />
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={damages.scratch}
            onChange={() => handleDamageChange('scratch')}
          />
          Scratch (+$50)
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={damages.dent}
            onChange={() => handleDamageChange('dent')}
          />
          Dent (+$100)
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={damages.brokenMirror}
            onChange={() => handleDamageChange('brokenMirror')}
          />
          Broken Mirror (+$150)
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={damages.flatTire}
            onChange={() => handleDamageChange('flatTire')}
          />
          Flat Tire (+$80)
        </label>
      </div>
      <button onClick={calculateTotalPrice}>Calculate Total Price</button>
      <div>Total Price: ${totalPrice}</div>
      <Link to="/Payement"><button>Check Out</button></Link>
    </div>
  );
};

export default CheckoutForm;
