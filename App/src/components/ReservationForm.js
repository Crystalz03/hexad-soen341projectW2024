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
  const [carArray, setCarArray] = useState([]); // State to store car array
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

  /*
  CODE FOR DYNAMIC DROPDOWN

  React.useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const vehiclesResponse = await fetch("http://localhost:9000/vehicles");
        const vehiclesArray = await vehiclesResponse.json();
        setCarArray(vehiclesArray);
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    };
    fetchVehicles();
  }, []);
  
  let options = carArray.map((vehicle) => (
    <option key={vehicle.id} value={vehicle.id}>
      {vehicle.model}
    </option>
  ));*/


  const validateForm = async () => {
    try {
      // get customer ID from email
      const customerResponse = await fetch(`http://localhost:9000/customers/email/${formData.email}`);
      const customerData = await customerResponse.json();
      formData.customerID = customerData.id;

      // check if vehicle id is valid and if the vehicle is available
      const vehicleResponse = await fetch(`http://localhost:9000/vehicles/${formData.vehicleID}`);
      const vehicleData = await vehicleResponse.json();
      if (!vehicleData) {
        setError("Vehicle not found");
        return false;
      } else{
      if (vehicleData.availability !== "available") {return false;}
      else if (vehicleData.availability === "available") {vehicleData.availability = "unavailable"; }

      // update vehicle availability
      const updateVehicle = async () => {
        try {
          const response = await fetch('http://localhost:9000/vehicles/'+formData.vehicleID, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(vehicleData),
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
      updateVehicle();
    }
      //generating the reservation id
      formData.id = generateRandomString(10);

      //calculating the total of reservation
      const reservationHours = (new Date(formData.returnDate) - new Date(formData.pickUpDate)) / (1000 * 60 * 60 );
      
      formData.total=vehicleData.price*reservationHours;

      //adding additional services to the total
      if (formData.additionalServices === "accidentInsurance") {
        formData.total+= 100;
      }else if (formData.additionalServices === "roadsideAssistance") {
        formData.total+= 50;
      }else if (formData.additionalServices === "none") {
        formData.total+= 0;
      }
      //adding additional equipment to the total
      if (formData.extraEquipment === "gps") {
        formData.total+= 80;
      }else if (formData.extraEquipment === "childSeat") {
        formData.total+= 120;
      }else if (formData.extraEquipment === "trailer") {
        formData.total+= 200;
      }else if (formData.extraEquipment === "bikeRack") {
        formData.total+= 175;
      }else if (formData.extraEquipment === "none") {
        formData.total+= 0;
      }

      

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

      <label>ID of the desired car:</label><br/>
      <input 
        name="vehicleID"
        required={true}
        value={formData.vehicleID || ""}
        onChange={handleChange} 
        type='text' 
        placeholder='Car ID'
        id='vehicleID'/><br/>

      <label>Extra equipment:</label><br/>
            <select required={true}>
              <option value={formData.extraEquipment||"none"}>None</option>
              <option value={formData.extraEquipment||"gps"}>GPS (Additional 80$)</option>
              <option value={formData.extraEquipment||"childSeat"}>Child Seat (Additional 120$)</option>
              <option value={formData.extraEquipment||"trailer"}>Trailer (Additional 200$)</option>
              <option value={formData.extraEquipment||"bikeRack"}>Bike Rack (Additional 175$)</option>
            </select>
            <br/>

      <label>Additional Services:</label><br/>
        <select required={true}>
          <option value={formData.additionalServices||"none"}>None</option>
          <option value={formData.additionalServices||"accidentInsurance"} >Accident Insurance (Additional 100$)</option>
          <option value={formData.additionalServices||"roadsideAssistance"} >Roadside Assistance (Additional 50$)</option>
        </select>
      <br/>

      <input type='submit'></input>
    </form>
  );
}

export default ReservationForm;
