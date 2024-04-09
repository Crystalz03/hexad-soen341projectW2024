//removed unused imports
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
  const [customers, setCustomers] = useState({});
  const [error, setError] = useState("");
  //customerID state not used

  
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
    
}
, []);

    
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:9000/customers");
        if (!response.ok) {
          throw new Error("Failed to fetch customers");
        }
        const data = await response.json();
        setCustomers(data.customers[0]);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setError("Error fetching customers");
      }
    };

    fetchCustomers();
  }, []);

    console.log(vehicle);
    console.log(customers);

    function verifyInput(){

    const customer = customers.find((customer) => customer.Email === formData.email);

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
        if(vehicle.Availability === "0"){//comparator symbol fixed
            alert("The vehicle you selected is unavailable.");
            return false;
          }
          if (customer === null){
            alert("The email you entered is not associated with an account.");
            return false;
          }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
          verifyInput()
          ) {
            if(formData.extraEquipment === ""){
              formData.extraEquipment = "none";}
            if(formData.additionalServices === ""){
              formData.additionalServices = "none";}
            if(formData.pickUpLocation === ""){
              formData.pickUpLocation = "MontrealBranch";}
            if(formData.dropOffLocation === ""){
              formData.dropOffLocation = "MontrealBranch";}
            console.log(formData);
            navigate(`/ConfirmBooking/${vehicleID}/${formData.email}/${formData.pickUpDate}/${formData.returnDate}/${formData.pickUpLocation}/${formData.dropOffLocation}/${formData.additionalServices}/${formData.extraEquipment}`);
    
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
    <div className="base-form" style={{height: '700px'}}>
        <form onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
          <div>
            <label>Email:
            <input 
                name="email"
                required={true}
                onChange={handleChange} 
                type='text' 
                placeholder='Email Address' 
                id='email'/>
                </label>
            </div>
          <span style={{ display: 'flex', marginTop: '30px', marginBottom: '0px'}}>
            <span  style={{ flex: 1, marginRight: '10px' }}>
            <label style={{width: '20em'}}>Pick-up date of your reservation:</label>
            <input 
                name="pickUpDate"
                required={true}
                value={formData.pickUpDate ||""}
                onChange={handleChange} 
                type='date' 
                placeholder='Beginning date of reservation' 
                id='pickUpDate'
                className="form-select"
                style={{width:'80%', backgroundImage: 'none', paddingRight: '0.8em'}}/>
              </span>
            <span  style={{ flex: 1}}>
            <label style={{width: '20em'}}> Return date of your reservation: </label>
            <input 
                name="returnDate"
                required={true}
                value={formData.returnDate || ""}
                onChange={handleChange} 
                type='date' 
                placeholder='Return date of reservation'
                id='returnDate'
                className="form-select"
                style={{width:'80%', backgroundImage: 'none', paddingRight: '0.8em'}}/></span>
          </span>
          <span style={{ display: 'flex', marginTop: '30px', marginBottom: '0px'}}>
            <span  style={{ flex: 1, marginRight: '10px' }}>
            <label>Pick-up Location:</label><br/>
                <select required={true} className="form-select" style={{width:'80%'}} onChange={handleChange} name = "pickUpLocation">
                <option value="MontrealBranch">Montreal</option>
                <option value="TorontoBranch">Toronto</option>
                <option value="VancouverBranch">Vancouver</option>
                </select>
            </span>
            <span style={{ flex: 1}}>
            <label>Drop-off Location:</label><br/>
                <select required={true} className="form-select" style={{width:'80%'}} onChange={handleChange} name = "dropOffLocation">
                <option value="MontrealBranch">Montreal</option>
                <option value="TorontoBranch">Toronto</option>
                <option value="VancouverBranch">Vancouver</option>
                </select>
            </span>
          </span>
            <label style={{marginTop: '2em'}}>Extra equipment:</label><br/>
                <select required={true} className="form-select" style={{width:'50%'}} onChange={handleChange} name = "extraEquipment">
                <option value="none">None</option>
                <option value="gps">GPS (Additional 80$)</option>
                <option value="childSeat">Child Seat (Additional 120$)</option>
                <option value="trailer">Trailer (Additional 200$)</option>
                <option value="bikeRack">Bike Rack (Additional 175$)</option>
                </select>
            <label style={{marginTop: '2em'}}>Additional Services:</label><br/>
                <select required={true} className="form-select" style={{width:'50%'}} onChange={handleChange} name ="additionalServices" >
                <option value="none">None</option>
                <option value="accidentInsurance" >Accident Insurance (Additional 100$)</option>
                <option value="roadsideAssistance" >Roadside Assistance (Additional 50$)</option>
                </select>

            <div>
                <button style={{width:'40%', marginTop: '2em'}} type='submit'>Continue</button> <br/> <br/>
                    
                <button style={{width:'40%'}} onClick={()=>{navigate(`/Browse`)}}>Cancel</button>
            </div>
        </form>
    </div>
    );
}

export default ReservationForm;/*
    useEffect(() => {
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
    fetchCustomer();}, []);*/
//navigate(`/ConfirmBooking/${vehicleID}/${formData.email}/${formData.pickUpDate}/${formData.returnDate}/${formData.pickUpLocation}/${formData.dropOffLocation}/${formData.additionalServices}/${formData.extraEquipment}`)}}}>Continue</button>