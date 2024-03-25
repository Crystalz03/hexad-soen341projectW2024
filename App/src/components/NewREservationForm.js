import { on } from 'events';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function ReservationForm(props){
  const vehicleID = props.vehicleID;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    pickUpDate: new Date(),
    returnDate: new Date(),
    extraEquipment: '',
    additionalServices: '',
    pickUpLocation: '',
    dropOffLocation: '',
    mileageLimit: '',
    branch: '',
  });
  const [vehicle, setVehicle] = useState({});
  const [customer, setCustomer] = useState({});

  
  useEffect(() => {
    const fetchVehicle = async () => {
        try {
            const response = await fetch(`http://localhost:9000/vehicles/${vehicleID}`);
            if (!response.ok) {
                throw new Error("Failed to fetch vehicle");
            }
            const data = await response.json();
            setVehicle(data.vehicle);
        } catch (error) {
            console.error("Error fetching vehicle:", error);
        }
    };
    fetchVehicle();
    const fetchCustomer = async () => {
        try {
            const response = await fetch(`http://localhost:9000/customers/${formData.email}`);
            if (!response.ok) {
                throw new Error("Failed to fetch customer");
            }
            const data = await response.json();
            setCustomer(data.customer);
        } catch (error) {
            console.error("Error fetching customer:", error);
        }
    };
    fetchCustomer();
}
, []);


    function verifyInput(formData){
    if (formData.pickUpDate > formData.returnDate) {
        alert("The return date must be after the pick-up date.");
        return false;
      }
      if (formData.pickUpDate < new Date()) {
        alert("The pick-up date must be in the future.");
        return false;
      }
        if (formData.returnDate < new Date()) {
            alert("The return date must be in the future.");
            return false;
        }
        if(vehicle.Availability == "0"){
            alert("The vehicle you selected is unavailable.");
            return false;
          }
          if (customer == null){
            alert("The email you entered is not associated with an account.");
            return false;
          }
        return true;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
        };


  return (
    <div>
        <form>
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

            <label>Pick-up Location:</label><br/>
                <select required={true} onChange={handleChange} name = "pickUpLocation">
                <option value="MontrealBranch">Montreal</option>
                <option value="TorontoBranch">Toronto</option>
                <option value="VancouverBranch">Vancouver</option>
                </select>
            <br/>

            <label>Drop-off Location:</label><br/>
                <select required={true} onChange={handleChange} name = "dropOffLocation">
                <option value="MontrealBranch">Montreal</option>
                <option value="TorontoBranch">Toronto</option>
                <option value="VancouverBranch">Vancouver</option>
                </select>
            <br/>

            <label>Extra equipment:</label><br/>
                <select onChange={handleChange} name = "extraEquipment">
                <option value="">None</option>
                <option value="gps">GPS (Additional 80$)</option>
                <option value="childSeat">Child Seat (Additional 120$)</option>
                <option value="trailer">Trailer (Additional 200$)</option>
                <option value="bikeRack">Bike Rack (Additional 175$)</option>
                </select>
            <br/>

            <label>Additional Services:</label><br/>
                <select onChange={handleChange} name ="additionalServices" >
                <option value="">None</option>
                <option value="accidentInsurance" >Accident Insurance (Additional 100$)</option>
                <option value="roadsideAssistance" >Roadside Assistance (Additional 50$)</option>
                </select>
            <br/>


                <button onClick={()=>{if(verifyInput(formData)){
                    navigate(`/ConfirmBooking/${vehicleID}/${formData.email}/${formData.pickUpDate}/${formData.returnDate}/${formData.pickUpLocation}/${formData.dropOffLocation}/${formData.additionalServices}/${formData.extraEquipment}`)}}}>Continue</button>
                <button onClick={()=>{navigate(`/Browse`)}}>Cancel</button>
        </form>
    </div>
    );
}

export default ReservationForm;