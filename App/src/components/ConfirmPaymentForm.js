import React, { useState, useEffect } from 'react';


function generateReservationID() {
    const prefix = 'R';
    const randomDigits = Math.floor(Math.random() * 1000000000); // Generate 9 random digits
    const reservationID = prefix + randomDigits.toString().padStart(9, '0'); // Ensure 9 digits with leading zeros if necessary
    return reservationID;
  }

function ConfirmPaymentForm(props){
    const formData = {
    vehicleID: props.formData.vehicleID,
    email: props.formData.email,
    pickUpDate: props.formData.pickUpDate,
    returnDate: props.formData.returnDate,
    pickUpLocation: props.formData.pickUpLocation,
    dropOffLocation: props.formData.dropOffLocation,
    additionalServices: props.formData.additionalServices,
    extraEquipment: props.formData.extraEquipment,
    total: props.formData.total,
    };
    const reservationID = generateReservationID();
    const reservation = {
        id: "",
        vehicleID: "",
        customerID: "",
        pickUpDate: "",
        returnDate: "",
        pickUpLocation: "",
        dropOffLocation: "",
        additionalServices: "",
        extraEquipment: "",
        total: "",
    };
    const [customer, setCustomer] = useState({});
    const [vehicle, setVehicle] = useState({});
    const [input, setInput] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });

    

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
                console.error("Error fetching vehicle:", error);
            }
        };
        fetchVehicle();
        const fetchCustomer = async () => {
            try {
                const response = await fetch(`http://localhost:9000/customers/email/${formData.email}`);
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

    const updateCustomer = async () => {
        try {
            const response = await fetch(`http://localhost:9000/customers/${customer.ID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name : customer.Name, 
                    lastName : customer.Last_Name, 
                    location : customer.Location, 
                    email : customer.Email, 
                    password: customer.Password, 
                    address : customer.Address, 
                    contactNumber : customer.Contact_Number, 
                    licenseNumber : customer.License_Number, 
                    creditCard : input.cardNumber
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to update customer");
            }
        } catch (error) {
            console.error("Error updating customer:", error);
        }
    };

    const updateVehicle = async () => {
        try {
            const response = await fetch(`http://localhost:9000/vehicles/${vehicle.ID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    make:vehicle.Make, 
                    category:vehicle.Category, 
                    model:vehicle.Model, 
                    price:vehicle.Price, 
                    availability:vehicle.Availability, 
                    year:vehicle.Year, 
                    plateNumber:vehicle.Plate_Number, 
                    color:vehicle.Color, 
                    damages:vehicle.Damages
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to update vehicle");
            }
        } catch (error) {
            console.error("Error updating vehicle:", error);
        }
    };


    const createReservation = async () => {
        try {
            const response = await fetch("http://localhost:9000/reservations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reservation),
            });
            if (!response.ok) {
                throw new Error("Failed to create reservation");
            }
        } catch (error) {
            console.error("Error creating reservation:", error);
        }
    };

        function verifyPayment(){
        if(input.cardNumber.length !== 16){
            alert("Invalid Card Number");
            return false;
        }
        if(input.expiryDate.length !== 5){
            alert("Invalid Expiry Date");
            return false;
        }else if(input.expiryDate[2] !== '/'){
            alert("Invalid Expiry Date");
            return false;
        }else if(input.expiryDate[0] > 1 || input.expiryDate[0] < 0){
            alert("Invalid Expiry Date");
            return false;
        }else if(input.expiryDate[0] === 1 && input.expiryDate[1] > 2){
            alert("Invalid Expiry Date");
            return false;
        }else if(input.expiryDate[3] < 2){
            alert("Invalid Expiry Date");
            return false;
        }else if(input.expiryDate[3] === 2 && input.expiryDate[4] < 4){
            alert("Invalid Expiry Date");
            return false;
        }
        if(input.cvv.length !== 3){
            alert("Invalid CVV");
            return false;
        }
        return true;
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput(prevState => ({
            ...prevState,
            [name]: value,
        }));
        };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(verifyPayment()){

            reservation.id = reservationID;
            reservation.vehicleID = vehicle.ID;
            reservation.customerID = customer.ID;
            reservation.pickUpDate = formData.pickUpDate;
            reservation.returnDate = formData.returnDate;
            reservation.pickUpLocation = formData.pickUpLocation;
            reservation.dropOffLocation = formData.dropOffLocation;
            reservation.additionalServices = formData.additionalServices;
            reservation.extraEquipment = formData.extraEquipment;
            reservation.total = formData.total;


            customer.Reservation_ID += ","+reservationID;
            vehicle.Availability = "0";
            console.log(reservation);
            updateCustomer();
        
            createReservation();
         
            alert("Payment Saved Successfully! Your reservation ID is: "+reservationID+" and the total cost is: "+formData.total+"$. An email has been sent to you with the reservation details.");

        }
    }

    return (
        
        <div>
            <form onSubmit={handleSubmit}>
                <label className="reservation-title" style={{marginTop:"20px", color: "black"}}>Card Number:</label>
                <input 
                    name="cardNumber"
                    required={true}
                    type='text' 
                    value= {input.cardNumber}
                    onChange={handleChange}
                    placeholder='Card Number' 
                    id='cardNumber'/><br/>
                <label className="reservation-title" style={{marginTop:"5px", color: "black"}}>Expiry Date:</label>
                <input 
                    name="expiryDate"
                    required={true}
                    type='text' 
                    value= {input.expiryDate}
                    onChange={handleChange}
                    placeholder='MM/YY' 
                    id='expiryDate'/><br/>
                <label className="reservation-title" style={{marginTop:"5px", color: "black"}}>CVV:</label>
                <input 
                    name="cvv"
                    required={true}
                    type='text' 
                    value= {input.cvv}
                    onChange={handleChange}
                    placeholder='CVV' 
                    id='cvv'/><br/><br/>

                <button type="submit" style={{display: "block", margin: "auto", backgroundColor :"#d6ffef"}}>Confirm Payment</button>
            </form>
        </div>
    );
}

export default ConfirmPaymentForm;