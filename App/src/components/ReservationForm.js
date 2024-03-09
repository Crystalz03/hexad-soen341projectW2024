import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return result;
}  

function ReservationForm() {
  
  const [formData, setFormData] = useState({
    id: '',
    vehicleID: '',
    customerID: '', // Adjusted from Customer_ID to customerID to match your formData object
    pickUpDate: '',
    returnDate: '',
    extraEquipment: '',
    additionalServices: '',
    total: '',
  });

  const [error, setError] = useState(""); // State to store error message
  const navigate = useNavigate();

  const callAPI = async () => {
    try {
      const response = await fetch("http://localhost:9000/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(
          "A problem occurred when creating the reservation. Please try again later."
        );
      }

      navigate("/");
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  const validateForm = async () => {
    try {
      // Example of making a GET request to check customer's account by email
      const customerResponse = await fetch(`http://localhost:9000/customers/email/${formData.email}`);
      const customerData = await customerResponse.json();

      // Example of making a GET request to check the availability of the vehicle
      const vehicleResponse = await fetch(`http://localhost:9000/vehicles/${formData.vehicleID}`);
      const vehicleData = await vehicleResponse.json();

      formData.id = generateRandomString(10);
    } catch (error) {
      setError(error.message);
      console.error(error);
      return false;
    }

    alert("Reservation has been made successfully!");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (await validateForm()) {
      callAPI();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email:</label>
      <input 
        name="email"
        required={true}
        value={formData.email || ""}
        onChange={handleChange} 
        type='text' 
        placeholder='Email Address' 
        id='email'/><br/>

      <label>Pick-up date of your reservation:</label>
      <input 
        name="pickUpDate"
        required={true}
        value={formData.pickUpDate || ""}
        onChange={handleChange} 
        type='date' 
        placeholder='Beginning date of reservation' 
        id='pickUpDate'/><br/>

      <label>Return date of your reservation:</label>
      <input 
        name="returnDate"
        required={true}
        value={formData.returnDate || ""}
        onChange={handleChange} 
        type='date' 
        placeholder='Return date of reservation'
        id='returnDate'/><br/>

      <label>Choose your preferred type of car:</label><br/>
      <select name='vehicleID' id='vehicleID' onChange={handleChange}>
        {/* Populate options from API data */}
      </select><br/>

      <input type='submit'></input>
    </form>
  );
}

export default ReservationForm;
