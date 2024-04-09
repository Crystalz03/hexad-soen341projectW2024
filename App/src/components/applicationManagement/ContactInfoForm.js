import React from "react";
import {useState} from "react";

function generateID() {
    const randomDigits = Math.floor(Math.random() * 1000000000); // Generate 9 random digits
    return randomDigits;
  }

function verifyContactInfo(contactInfo) {
    if(contactInfo.first_name === "" || contactInfo.last_name === "" || contactInfo.email === "" || contactInfo.phone === ""){
        alert("Please fill out all required fields.");
        return false;
    }
    if(contactInfo.phone.length !== 10){
        alert("Please enter a valid phone number.");
        return false;
    }
    if(contactInfo.email.indexOf('@') === -1 || contactInfo.email.indexOf('.') === -1){
        alert("Please enter a valid email address.");
        return false;
    }
    return true;
}

function ContactInfoForm(props) {
    const [contactInfo, setContactInfo] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        message: "",
    });

    const vehicleApplication = {
        id: generateID(),
        category: props.vehicleApplicationInfo.category,
        color: props.vehicleApplicationInfo.color,
        damages: props.vehicleApplicationInfo.damages,
        make: props.vehicleApplicationInfo.make,
        model: props.vehicleApplicationInfo.model,
        mileage: props.vehicleApplicationInfo.mileage,
        year: props.vehicleApplicationInfo.year,
        offerAmount: props.vehicleApplicationInfo.offerAmount,
        first_name: contactInfo.first_name,
        last_name: contactInfo.last_name,
        email: contactInfo.email,
        phone: contactInfo.phone,
        message: contactInfo.message,
    };

    const createVehiclaApplication = async () => {
        try {
            const response = await fetch("http://localhost:9000/applications", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(vehicleApplication),
            });
            if (!response.ok) {
                throw new Error("Failed to create the application");
            }
        } catch (error) {
            console.error("Error creating the application:", error);
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setContactInfo(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(verifyContactInfo(contactInfo)){
            console.log("Your contact information as well as the vehicle application information have been saved into the database. We will contact you shortly. Thank you for your interest in saving our planet and helping Hexad!");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="base-form" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '30px' }}>
                <h1>Contact Information</h1>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label htmlFor="first_name">Name:</label>
                    <input onChange={handleChange} type="text" id="first_name" name="first_name" required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label htmlFor="last_name">Last Name:</label>
                    <input onChange={handleChange} type="text" id="last_name" name="last_name" required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label htmlFor="email">Email:</label>
                    <input onChange={handleChange} type="email" id="email" name="email" required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label htmlFor="phone">Phone:</label>
                    <input onChange={handleChange} placeholder="XXXXXXXXX" type="text" id="phone" name="phone" required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label htmlFor="message">Message:</label>
                    <textarea onChange={handleChange} id="message" name="message" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}></textarea>
                </div>

                <button type="submit" style={{ width: '100%', padding: '10px',  color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Submit</button>
            </form>
        </div>
    );
}

export default ContactInfoForm;