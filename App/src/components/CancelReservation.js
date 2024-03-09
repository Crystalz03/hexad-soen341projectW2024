import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './../style/Cancel.css';

function CancelReservationForm() {
    const [confirmationNumber, setConfirmationNumber] = useState('');
    const [error, setError] = useState(null); 
    const navigate = useNavigate();
    
    const isFormatValidConfirmationNumber = (confirmationNumber) => {
        const regex = /^[A-Z]{1}\d{9}$/;
        const isValid = regex.test(confirmationNumber);
        if (!isValid) {
            setError("The format you have entered is invalid. Please try again.");
            return false;
        }
        return true;
    }

    const handleChange = (e) => {
        setConfirmationNumber(e.target.value);
    };

    const handleSubmit = async (e) => { 
        e.preventDefault(); 
        if (!isFormatValidConfirmationNumber(confirmationNumber)) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:9000/reservations/${confirmationNumber}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            if (response.ok) {
                console.log('Reservation successfully canceled');
            } else {
                setError('Failed to cancel reservation. Please try again later.');
                console.error('Failed to cancel reservation:', response.statusText);
            }
        } catch (error) {
            setError('An error occurred while cancelling the reservation. Please try again later.');
            console.error('Error cancelling reservation:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label> Confirmation Number:
                <input
                    type="text"
                    value={confirmationNumber} 
                    placeholder="Enter Confirmation Number"
                    required
                    onChange={handleChange}
                />
            </label>
            {error && <p className="error">{error}</p>}
            <button type="submit">Cancel</button>
        </form>
    );
}

export default CancelReservationForm;
