import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function generateReservationID() {
  const prefix = 'R';
  const randomDigits = Math.floor(Math.random() * 1000000000); // Generate 9 random digits
  const reservationID = prefix + randomDigits.toString().padStart(9, '0'); // Ensure 9 digits with leading zeros if necessary
  return reservationID;
}


function ReservationForm(){

  
  const [vehicles, setVehicles] = useState([[{}]]);
  const [customers, setCustomers] = useState([[{}]]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    vehicleID: '',
    email: '',
    customerID: '', 
    pickUpDate: '',
    returnDate: '',
    extraEquipment: '',
    additionalServices: '',
    paid: '',
    total: '',
  });
  const reservation= {
    id: '',
    vehicleID: '',
    customerID: '', 
    pickUpDate: '',
    returnDate: '',
    extraEquipment: '',
    additionalServices: '',
    paid: '',
    total: '',
  };

  
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("http://localhost:9000/vehicles");
        if (!response.ok) {
          throw new Error("Failed to fetch vehicles");
        }
        const data = await response.json();
        setVehicles(data.vehicle);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setError("Error fetching vehicles");
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  console.log(vehicles);

  
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:9000/customers");
        if (!response.ok) {
          throw new Error("Failed to fetch customers");
        }
        const data = await response.json();
        setCustomers(data.customers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setError("Error fetching customers");
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  console.log(customers);

  

  const vehiclesArray= vehicles[0];
  const customersArray= customers[0];

  console.log(vehiclesArray);
  console.log(customersArray);

  
  const createReservation = async () => {
    try {
      console.log("creating reservation");
      const response = await fetch("http://localhost:9000/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservation),
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
    let reservedVehicle=null;
    console.log("TEST", formData);
    
    console.log("vehicle reserved",formData.vehicleID);
    for (let i = 0; i < vehiclesArray.length; i++) {
      console.log("vehicles in loop",vehiclesArray[i].ID);
      if (vehiclesArray[i].ID === formData.vehicleID) {
        reservedVehicle=vehiclesArray[i];
        break;
      }
    }
    console.log("reserved vehicle",reservedVehicle);
    if (reservedVehicle === null) {
      alert("The vehicle you selected does not exist.");
      return false;
    } else if(reservedVehicle.Availability === "0"){
      alert("The vehicle you selected is unavailable.");
      return false;
    }else if(reservedVehicle.Availability === "1"){
      reservedVehicle.Availability = "0";
    }

    reservation.vehicleID = reservedVehicle.ID;
    
    let customerAcc = null;
    console.log("customer array",customersArray);
    for (let i = 0; i < customersArray.length; i++) {
      console.log("customer in loop",customersArray[i].Email);
      if (customersArray[i].Email === formData.email) {
        customerAcc=customersArray[i];
        break;
      }
    }
    if (customerAcc === null) {
      alert("The email you entered is not associated to an existing account.");
      return false;
    } else if (customerAcc.Email===formData.email) {
      reservation.customerID = customerAcc.ID;
    }
    
    
    if (formData.pickUpDate > formData.returnDate) {
      alert("The return date must be after the pick-up date.");
      return false;
    }
    if (formData.pickUpDate < new Date()) {
      alert("The pick-up date must be in the future.");
      return false;
    }

    reservation.pickUpDate = formData.pickUpDate;
    reservation.returnDate = formData.returnDate;

    reservation.extraEquipment = formData.extraEquipment;
    reservation.additionalServices = formData.additionalServices;

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

    reservation.paid = false;
    console.log("reservation TEST",reservation);


    //reservation.id = result;
    reservation.id = generateReservationID();
    console.log("reservation id",reservation.id);


    const ReservationDuration = (new Date(formData.returnDate) - new Date(formData.pickUpDate))/(1000*60*60*24);
    console.log("duration",ReservationDuration);
    console.log("price",reservedVehicle.Price);
    console.log("id",reservation.id);
    
    console.log("id",reservation);
    reservation.total=reservedVehicle.Price*ReservationDuration;
    console.log("reservation TEST",reservation);

    return true;

  }

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("does it even work",formData);
    

    if (
      verifyForm()
      ) {
      createReservation();
      console.log(reservation);
      
      console.log(reservation);
      alert("Reservation has been made successfully! Your reservation ID is: "+reservation.id+" and the total cost is: "+reservation.total+"$");
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
        onChange={handleChange} 
        type='text' 
        placeholder='Email Address' 
        id='email'/><br/>

      <label>Pick-up date of your reservation:</label>
      <input 
        name="pickUpDate"
        required={true}
        value={formData.pickUpDate ||""}
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
            <select  onChange={handleChange} name = "extraEquipment">
              <option value="">None</option>
              <option value="gps">GPS (Additional 80$)</option>
              <option value="childSeat">Child Seat (Additional 120$)</option>
              <option value="trailer">Trailer (Additional 200$)</option>
              <option value="bikeRack">Bike Rack (Additional 175$)</option>
            </select>
            <br/>

      <label>Additional Services:</label><br/>
        <select  onChange={handleChange} name ="additionalServices" >
          <option value="">None</option>
          <option value="accidentInsurance" >Accident Insurance (Additional 100$)</option>
          <option value="roadsideAssistance" >Roadside Assistance (Additional 50$)</option>
        </select>
      <br/>

      <input type='submit'></input>
    </form>
  );


};

export default ReservationForm;