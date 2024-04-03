import React, { useState } from "react";

function Deposit({ customer, onSubmit }) {
    const [error, setError] = useState("");
    const [updatedCustomer, setUpdatedCustomer] = useState(customer);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateCreditCard(updatedCustomer.creditCard)) {
            setError("Invalid credit card number.");
            return;
        }
        if (!validateCVV(updatedCustomer.cvv)) {
            setError("Invalid CVV.");
            return;
        }
        onSubmit("Deposit of 500 CAD has been successfully taken from the customer's credit card.");
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
            <h2>Payment</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', marginTop: '30px', marginBottom: '0px'}}>
                <div style={{ flex: 1, marginRight: '10px' }}>
                    <label>Credit Card:</label>
                    <input
                        type="text"
                        name="creditCard"
                        value={updatedCustomer.creditCard || ""}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ flex: 1, marginRight: '10px' }}>
                    <label>CVV:</label>
                    <input
                        type="text"
                        name="cvv"
                        value={updatedCustomer.cvv || ""}
                        onChange={handleChange}
                    />
                    </div>
                </div> <br/>
                <button type="submit">Pay</button>
            </form>
        </div>
    );
}

export default Deposit;
