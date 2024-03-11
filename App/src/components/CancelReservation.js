import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

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
        setReservationId(e.target.value);
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
                setError('Failed to delete reservation. Please try again later.');
                console.error('Failed to delete reservation:', response.statusText);
            }
        } catch (error) {
            setError('An error occurred while deleting the reservation. Please try again later.');
            console.error('Error deleting reservation:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label> Reservation ID:
                <input
                    type="text"
                    value={reservationId} 
                    placeholder="Enter Reservation ID"
                    required
                    onChange={handleChange}
                />
            </label>
            {error && <p className="error">{error}</p>}
            <button type="submit">Delete Reservation</button>
        </form>
    );
}

export default CancelReservationForm;
