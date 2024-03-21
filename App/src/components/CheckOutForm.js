import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CheckoutForm = () => {
  const [reservationId, setReservationId] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [damages, setDamages] = useState({
    scratch: false,
    dent: false,
    brokenMirror: false,
    flatTire: false,
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState("");
  const [reservation, setReservation] = useState({});

  const damagePrices = {
    scratch: 50,
    dent: 100,
    brokenMirror: 150,
    flatTire: 80,
  };

  useEffect(() => {
    if (reservationId !== "") {
      getOriginalPrice();
    }
  }, [reservationId]);

  useEffect(() => {
    console.log(reservation); // Log the updated reservation state
  }, [reservation]);

  const handleDamageChange = (damage) => {
    setDamages({
      ...damages,
      [damage]: !damages[damage],
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
    updateTotalInDatabase(total);
  };

  const handleReservationIdChange = (event) => {
    setReservationId(event.target.value);
  };

  function isFormatValidReservationId(reservationId) {
    const regex = /^[A-Z]{1}\d{9}$/;
    const isValid = regex.test(reservationId);
    if (!isValid) {
      setError("The format you have entered is invalid. Please try again.");
      return false;
    }
    return true;
  }

  const getOriginalPrice = async () => {
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
        setReservation(data.reservation);
        setOriginalPrice(data.reservation.Total);
      } else {
        setError("Failed to retrieve total amount");
        console.error("Failed to retrieve total amount", response.statusText);
      }
    } catch (error) {
      setError("Failed to retrieve reservation. Please try again later.");
      console.error("Failed to retrieve reservation:", error);
    }
  };

  const updateTotalInDatabase = async (total) => {
    try {
      console.log(total);
      const response = await fetch(
        `http://localhost:9000/reservations/${reservationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vehicleID: reservation.Vehicle_ID,
            customerID: reservation.Customer_ID,
            pickUpDate: reservation.Pick_Up_Date,
            returnDate: reservation.Return_Date,
            extraEquipment: reservation.Extra_Equipment,
            additionalServices: reservation.Additional_Services,
            paid: reservation.Paid,
            total: total,
          }),
        }
      );

      if (!response.ok) {
        setError("Failed to update total in the database");
        console.error(
          "Failed to update total in the database",
          response.statusText
        );
      }
    } catch (error) {
      setError(
        "Failed to update total in the database. Please try again later."
      );
      console.error("Failed to update total in the database:", error);
    }
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
          <input type="number" value={originalPrice} readOnly />
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={damages.scratch}
            onChange={() => handleDamageChange("scratch")}
          />
          Scratch (+$50)
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={damages.dent}
            onChange={() => handleDamageChange("dent")}
          />
          Dent (+$100)
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={damages.brokenMirror}
            onChange={() => handleDamageChange("brokenMirror")}
          />
          Broken Mirror (+$150)
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={damages.flatTire}
            onChange={() => handleDamageChange("flatTire")}
          />
          Flat Tire (+$80)
        </label>
      </div>
      <button onClick={calculateTotalPrice}>Calculate Total Price</button>
      <div>Total Price: ${totalPrice}</div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <Link to="/Payment">
        <button>Check Out</button>
      </Link>
    </div>
  );
};

export default CheckoutForm;
