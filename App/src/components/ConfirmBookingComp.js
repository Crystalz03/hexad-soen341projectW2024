import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

function ConfirmBookingComp(props){
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState({});
    let total=0;
    const formData = {
      vehicleID: props.formData.vehicleID,
      email: props.formData.email,
      pickUpDate: props.formData.pickUpDate,
      returnDate: props.formData.returnDate,
      pickUpLocation: props.formData.pickUpLocation,
      dropOffLocation: props.formData.dropOffLocation,
      additionalServices: props.formData.additionalServices,
      extraEquipment: props.formData.extraEquipment,
  };
    const [customer, setCustomer] = useState({
      ID: "",
      Name: "",
      Last_Name: "",
      Reservation_ID: "",
      Location: "",
      Email: "",
      Password: "",
      Address: "",
      Contact_Number: "",
      License_Number: "",
      Credit_Card: "",
    });
    const [error, setError] = useState("");

    console.log(formData, formData.email);
    console.log("testtt ", `http://localhost:9000/customers/email/${formData.email}` );

    
  useEffect(() => {
    const fetchVehicle = async () => {
        try {
            const response = await fetch(`http://localhost:9000/vehicles/${formData.vehicleID}`);
            if (!response.ok) {
                throw new Error("Failed to fetch vehicle");
            }
            const data = await response.json();
            setVehicle(data.vehicle);
        } catch (error) {
          setError("Error fetching vehicle");//added error handling
          console.error("Error fetching vehicle:", error);
        }
    };
    fetchVehicle();
      
  }
  , []);
   
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`http://localhost:9000/customers/email/${formData.email}`);
        if (!response.ok) {
          throw new Error("Failed to fetch customers");
        }
        const data = await response.json();
        setCustomer(data.customer);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setError("Error fetching customers");
      }
    };

    fetchCustomer();
  }, []);

  console.log(customer);
    
    if (formData.additionalServices === "accidentInsurance") {
        total+= 100;
      }else if (formData.additionalServices === "roadsideAssistance") {
        total+= 50;
      }else if (formData.additionalServices === "none") {
        total+= 0;
      }
      //adding additional equipment to the total
      if (formData.extraEquipment === "gps") {
        total+= 80;
      }else if (formData.extraEquipment === "childSeat") {
        total+= 120;
      }else if (formData.extraEquipment === "trailer") {
        total+= 200;
      }else if (formData.extraEquipment === "bikeRack") {
        total+= 175;
      }else if (formData.extraEquipment === "none") {
        total+= 0;
      }
    
    const ReservationDuration = (new Date(formData.returnDate) - new Date(formData.pickUpDate))/(1000*60*60*24);
        total +=vehicle.Price*ReservationDuration;

    const formatPhoneNumber = (phoneNumber) => {
      // Assuming phoneNumber is a string of 10 digits
      const cleaned = ('' + phoneNumber).replace(/\D/g, '');
      const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
      }
      return null; // return null for invalid phone numbers
    };

    return(
        <div> 
          {error && <p className="error">{error}</p>}{" "}
            <div className="reservation-title" style={{marginTop:"5px", color: "black"}}>Vehicle Information</div>
            <p>Make: {vehicle.Make}</p>
            <p>Model: {vehicle.Model}</p>
            <p>Category: {vehicle.Category}</p>
            <p>Price: {vehicle.Price}$</p>
            <div className="reservation-title" style={{marginTop:"5px", color: "black"}}>Customer Information</div>
            <p>Name: {customer.Name}</p>
            <p>Email: {customer.Email}</p>
            <p>Phone: {customer.Contact_Number && formatPhoneNumber(customer.Contact_Number)}</p>
            <div className="reservation-title" style={{marginTop:"5px", color: "black"}}>Reservation Information</div>
            <p>Pick Up Date: {formData.pickUpDate}</p>
            <p>Return Date: {formData.returnDate}</p>
            <p>Pick Up Location: {formData.pickUpLocation}</p>
            <p>Drop Off Location: {formData.dropOffLocation}</p>
            <p>Additional Services: {formData.additionalServices}</p>
            <p>Extra Equipment: {formData.extraEquipment}</p>
            <p>Total : {vehicle.Price}$/day x {ReservationDuration} days = {total}$ </p><br/>
            <button style={{ padding: '0.5em', border: 'none', borderRadius: '10%', display: "block", margin: "auto", backgroundColor :"#d6ffef"}} onClick={()=>{navigate(`/ConfirmPayment/${formData.vehicleID}/${formData.email}/${formData.pickUpDate}/${formData.returnDate}/${formData.pickUpLocation}/${formData.dropOffLocation}/${formData.additionalServices}/${formData.extraEquipment}/${total}`)}}>Confirm</button><br/>
            <button style={{ padding: '0.5em', border: 'none', borderRadius: '10%', display: "block", margin: "auto", backgroundColor:"#ffb0b9"}} onClick={()=>{navigate(`/Browse`)}}>Cancel</button>
        </div>
    );
}

export default ConfirmBookingComp;