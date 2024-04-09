import React, { useState } from "react";

function Deposit({ customer, onSubmit }) {
    const [error, setError] = useState("");
    const [updatedCustomer, setUpdatedCustomer] = useState(customer);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("test")

        if (!validateCreditCard(updatedCustomer.creditCard)) {
            setError("Invalid Credit Card Number.");
            return;
        }
        if (!validateCVV(updatedCustomer.cvv)) {
            setError("Invalid CVV.");
            return;
        }
        if (!validateExDate(updatedCustomer.exDate)) {
            setError("Invalid Expiration Date.");
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

    const validateExDate = (exDate) => {
        if (!/^\d{2}\/\d{2}$/.test(exDate)) {
            return false;
        }
    
        const [expMonth, expYear] = exDate.split('/').map(part => parseInt(part, 10));
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;
    
        if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
            return false;
        }

        if(expMonth > 12){
            return false
        }
    
        return true;
    };
    
  
    return (
        <div>
            <h2>Payment</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Credit Card:</label>
                    <input
                        type="text"
                        name="creditCard"
                        value={updatedCustomer.creditCard || ""}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Expiration date:</label>
                    <input
                        type="text"
                        name="exDate"
                        value={updatedCustomer.exDate || ""}
                        onChange={handleChange}
                        placeholder="MM/YY"
                    />
                </div>
                <div>
                    <label>CVV:</label>
                    <input
                        type="text"
                        name="cvv"
                        value={updatedCustomer.cvv || ""}
                        onChange={handleChange}
                        placeholder="CVV"
                    />
                </div> <br/>
                <button type="submit">Pay</button>
            </form>
        </div>
    );
}

export default Deposit;
