import React, { useState, useEffect } from 'react';
import nodemailer from 'nodemailer';

function ConfirmPaymentForm(props){
    const formData = props.formData;
    const [customer, setCustomer] = useState({});
    const [vehicle, setVehicle] = useState({});

    const [input, setInput] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });
    const reservationID = generateReservationID();

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

    const updateCustomer = async () => {
        try {
            const response = await fetch(`http://localhost:9000/customers/${formData.email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customer),
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
                body: JSON.stringify(vehicle),
            });
            if (!response.ok) {
                throw new Error("Failed to update vehicle");
            }
        } catch (error) {
            console.error("Error updating vehicle:", error);
        }
    };


    const createReservation = async () => {
        const reservation = {
            ID: reservationID,
            Vehicle_ID: vehicle.ID,
            Customer_ID: customer.ID,
            Pick_Up_Date: formData.pickUpDate,
            Return_Date: formData.returnDate,
            Pick_Up_Location: formData.pickUpLocation,
            Drop_Off_Location: formData.dropOffLocation,
            Additional_Services: formData.additionalServices,
            Extra_Equipment: formData.extraEquipment,
            Total: formData.total,
            Paid: false,
            Mileage_Limit: null,
        };
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


        function generateReservationID() {
            const prefix = 'R';
            const randomDigits = Math.floor(Math.random() * 1000000000); // Generate 9 random digits
            const reservationID = prefix + randomDigits.toString().padStart(9, '0'); // Ensure 9 digits with leading zeros if necessary
            return reservationID;
          }

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
        }else if(input.expiryDate[0] == 1 && input.expiryDate[1] > 2){
            alert("Invalid Expiry Date");
            return false;
        }else if(input.expiryDate[3] < 2){
            alert("Invalid Expiry Date");
            return false;
        }else if(input.expiryDate[3] == 2 && input.expiryDate[4] < 4){
            alert("Invalid Expiry Date");
            return false;
        }
        if(input.cvv.length !== 3){
            alert("Invalid CVV");
            return false;
        }
        return true;
    }

    const sendEmail = async () => {
        const transporter = nodemailer.createTransport({
          host: 'smtp.example.com',
          port: 587,
          secure: false,
          auth: {
            user: 'hexad97@gmail.com',
            pass: 'hexadteam2024',
          },
        });
        const mailOptions = {
          from: 'hexad97@gmail.com',
          to: formData.email,
          subject: 'Reservation Confirmation',
          text: "Your reservation has been confirmed. Your reservation ID is " + reservationID + ".\n\nHere are your reservation's details:\n\n"+
          "Vehicle: " + vehicle.Make + " " + vehicle.Model + "\n" +"Pick-up Date: " + formData.pickUpDate + "\n" + "Return Date: " + formData.returnDate + "\n" + "Pick-up Location: " + formData.pickUpLocation + "\n" + "Drop-off Location: " + formData.dropOffLocation + "\n" + "Additional Services: " + formData.additionalServices + "\n" + "Extra Equipment: " + formData.extraEquipment + "\n" + "Total: " + formData.total + "\n\n" + "Thank you for choosing our services!n\n\nHexad",
        };
        try {
          await transporter.sendMail(mailOptions);
          console.log('Email sent successfully');
        } catch (error) {
          console.error('Error sending email:', error);
        }
      };
    
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
            customer.Reservation_ID = reservationID;
            vehicle.Availability = "0";
            updateCustomer();
            updateVehicle();
            createReservation();
            sendEmail();
            alert("Payment Saved Successfully! Your reservation ID is: "+reservationID+" and the total cost is: "+formData.total+"$. An email has been sent to you with the reservation details.");

        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit()}>
                <label>Card Number:</label>
                <input 
                    name="cardNumber"
                    required={true}
                    type='text' 
                    value= {input.cardNumber}
                    onChange={handleChange}
                    placeholder='Card Number' 
                    id='cardNumber'/><br/>
                <label>Expiry Date:</label>
                <input 
                    name="expiryDate"
                    required={true}
                    type='text' 
                    value= {input.expiryDate}
                    onChange={handleChange}
                    placeholder='MM/YY' 
                    id='expiryDate'/><br/>
                <label>CVV:</label>
                <input 
                    name="cvv"
                    required={true}
                    type='text' 
                    value= {input.cvv}
                    onChange={handleChange}
                    placeholder='CVV' 
                    id='cvv'/><br/>

                <button type="submit">Confirm Payment</button>
            </form>
        </div>
    );
}

export default ConfirmPaymentForm;