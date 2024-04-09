import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const [reservationId, setReservationId] = useState("");
  const [vehicleID, setVehicleID] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [damages, setDamages] = useState({
    scratch: false,
    dent: false,
    brokenMirror: false,
    flatTire: false,
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [initialDamages, setInitialDamages]= useState([]);
  const [error, setError] = useState("");
  const [reservation, setReservation] = useState({});

  const navigate = useNavigate(); 

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

  useEffect(() => {
    if (vehicleID !== "") {
      getInitialDamages(vehicleID);
    }
  }, [vehicleID]);

  useEffect(() => {
    console.log(vehicleID); // Log the updated reservation state
  }, [vehicleID]);
  
  const handleDamageChange = (damage) => {
    setDamages({
      ...damages,
      [damage]: !damages[damage],
    });
  };

  const calculateTotalPrice = () => {
    let total = originalPrice;
    for (const damage in damages) {
      if (damages[damage] && !initialDamages.includes(damage)) {
        total += damagePrices[damage];
      }
    }
    setTotalPrice(total);
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
        setVehicleID(data.reservation.Vehicle_ID);
      } else {
        setError("Failed to retrieve total amount");
        console.error("Failed to retrieve total amount", response.statusText);
      }
    } catch (error) {
      setError("Failed to retrieve reservation. Please try again later.");
      console.error("Failed to retrieve reservation:", error);
    }
  };

  const getInitialDamages = async (vehicleID) => {
    try {
      const response = await fetch(
        `http://localhost:9000/vehicles/${vehicleID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        
        if (data && data.vehicle.Damages) { // Check if data and data.damages exist
          console.log(data.vehicle.Damages);
          const damagesArray = data.vehicle.Damages.split(" ");
          setInitialDamages(damagesArray);
        } else {
          setInitialDamages([]);
          console.log("There are no vehicle damages");
        }
      } else {
        setError("Failed to retrieve original damages.");
        console.error("Failed to retrieve initial damages:", response.statusText);
      }
    } catch (error) {
      setError("Failed to retrieve original damages. Please try again later.");
      console.error("Failed to retrieve initial damages:", error);
    }
  };
  
  

  const handleCheckout = () => {
    // Navigate to Payment page with totalPrice and reservationID in state
    navigate("/Payment", { state: { totalPrice, reservationId} });
  };

  return (
    <div className="base-form">
      <div>
        <label>
          Reservation ID {' '}
          <input
            type="text"
            value={reservationId}
            onChange={handleReservationIdChange}
          />
        </label>
      </div>
      <div>
        <label>
          Original Price {' '}
          <input type="number" value={originalPrice} readOnly />
        </label>
      </div>
      <div  style={{height: '2em'}}>
        <label>
          <input
            type="checkbox"
            checked={damages.scratch}
            onChange={() => handleDamageChange("scratch")}
            style={{height: '1.2em', width: '1.2em'}}
          />

          <span style={{ marginLeft: "5px", fontSize:'1.1em' }}>Scratch (+$50)</span>
        </label>
      </div>
      <div  style={{height: '2em'}}>
        <label>
          <input
            type="checkbox"
            checked={damages.dent}
            onChange={() => handleDamageChange("dent")}
            style={{height: '1.2em', width: '1.2em'}}
          />

          <span style={{ marginLeft: "5px", fontSize:'1.1em' }}> Dent (+$100) </span>
        </label>
      </div>
      <div  style={{height: '2em'}}>
        <label>
          <input
            type="checkbox"
            checked={damages.brokenMirror}
            onChange={() => handleDamageChange("brokenMirror")}
            style={{height: '1.2em', width: '1.2em'}}
          />

        <span style={{ marginLeft: "5px", fontSize:'1.1em' }}> Broken Mirror (+$150) </span>
        </label>
      </div>
      <div style={{height: '2em'}}>
        <label>
          <input
            type="checkbox"
            checked={damages.flatTire}
            onChange={() => handleDamageChange("flatTire")}
            style={{height: '1.2em', width: '1.2em'}}
          />
           <span style={{ marginLeft: "5px", fontSize:'1.1em' }}> Flat Tire (+$80) </span>
        </label>
      </div>
      <br/>
      <p style={{marginBottom: '1em'}}>Total Price: ${totalPrice}</p> 
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button onClick={calculateTotalPrice}>Calculate Total Price</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button onClick={handleCheckout}>Check Out</button>
    </div>
  );
};

export default CheckoutForm;
