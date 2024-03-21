import React, { useState, useEffect } from "react";
import {useLocation} from 'react-router-dom';

function UpdateVehicleForm() {
  const [formData, setFormData] = useState({
    id: '',
      type: '',
      category: '',
      model: '',
      price: '',
      availability:'',
    });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("http://localhost:9000/vehicles");
        if (!response.ok) {
          throw new Error("Failed to fetch vehicles");
        }
        const data = await response.json();
        setVehicles(data.vehicle);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setError("Error fetching vehicles");
      }
    };

    fetchVehicles();
  }, []);

  const vehiclesArray = vehicles[0];

  const updateInfo = async () => {
    try {
      console.log("updating vehicle info...");
      const response = await fetch(`http://localhost:9000/vehicless/${vehicleID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });

      if (!response.ok) {
        throw new Error(
          "A problem occurred when creating the reservation. Please try again later."
        );
      }
      //navigate("/");
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  function verifyForm() {
  }

  return(
    <div>TEST</div>
  );

}

export default UpdateVehicleForm;