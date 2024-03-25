import React, { useState } from "react";

function UpdateCustomer({ customer, onSubmit }) {
    const [error, setError] = useState("");
    const [updatedCustomer, setUpdatedCustomer] = useState(customer);
    
    const update = async () => {
         
         if (!validateCreditCard(updatedCustomer.creditCard)) {
            setError("Invalid credit card number.");
            return;
        }
        if (!validateCVV(updatedCustomer.cvv)) {
            setError("Invalid CVV.");
            return;
        }
        try {
            const response = await fetch(
                `http://localhost:9000/customers/${customer.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: updatedCustomer.name,
                        lastName: updatedCustomer.lastName,
                        location: updatedCustomer.location,
                        email: updatedCustomer.email,
                        password: customer.password,
                        address: updatedCustomer.address,
                        contactNumber: updatedCustomer.contactNumber,
                        licenseNumber: updatedCustomer.licenseNumber,
                        creditCard: updatedCustomer.creditCard,
                    },
                   )
                }
            );
            if (response.ok) {
                // Successful update
                alert("Customer information updated successfully");
                onSubmit(updatedCustomer);
            } else {
                setError("Error updating user information");
            }
        } catch (error) {
            console.error("Error updating user information:", error);
            setError("Error updating user information");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        update();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedCustomer((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validateCreditCard = (cardNumber) => {
        const strippedCardNumber = cardNumber.replace(/\s/g, '');
        
        if (!/^\d{16}$/.test(strippedCardNumber)) {
            return false;
        }
        const formattedCardNumber = strippedCardNumber.replace(/(\d{4})/g, '$1 ');

        return formattedCardNumber.trim() === cardNumber.trim();
    };

    const validateCVV = (cvv) => {
        return /^\d{3}$/.test(cvv);
    };
  
    return (
        <div>
            <h2>Confirm Customer Information</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div  style={{ display: 'flex', marginTop: '30px', marginBottom: '0px'}}>
                <div style={{ flex: 1, marginRight: '10px' }}>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={updatedCustomer.name || ""}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={updatedCustomer.lastName || ""}
                        onChange={handleChange}
                    />
                </div>
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={updatedCustomer.email || ""}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={updatedCustomer.address || ""}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Contact Number:</label>
                    <input
                        type="text"
                        name="contactNumber"
                        value={updatedCustomer.contactNumber || ""}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>License Number:</label>
                    <input
                        type="text"
                        name="licenseNumber"
                        value                             ={updatedCustomer.licenseNumber || ""}
                        onChange={handleChange}
                    />
                </div>
                <div  style={{ display: 'flex', marginTop: '30px', marginBottom: '0px'}}>
                    <div style={{ flex: 1, marginRight: '10px' }}>
                    <label>Credit Card:</label>
                    <input
                        type="text"
                        name="creditCard"
                        value={updatedCustomer.creditCard || ""}
                        onChange={handleChange}
                    />
                    </div>
                    <div style={{ flex: 1 }}>
                    <label>CVV:</label>
                    <input
                        type="text"
                        name="cvv"
                        onChange={handleChange}
                    />
                    </div>
                </div>
                <button type="submit">Confirm</button>
            </form>
        </div>
    );
}

export default UpdateCustomer;
