import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function CancelReservation() {
    const [reservationId, setReservationId] = useState('');
    const [error, setError] = useState(null); 
    const navigate = useNavigate();

    const isFormatValidReservationId = (reservationId) => {
        // const regex = /^[A-Z]{1}\d{9}$/;
        // return regex.test(reservationId);
    }

    const handleChange = (e) => {
        setReservationId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reservationIdTrimmed = reservationId.trim(); // Trim the reservation ID

        if (!isFormatValidReservationId(reservationIdTrimmed)) {
            setError("Invalid reservation ID format");
            return;
        }
        try {
            const response = await fetch(`http://localhost:9000/reservations/${reservationIdTrimmed}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            if (response.ok) {
                console.log('Reservation successfully canceled');
               
                navigate('/'); //
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
            <button type="submit">Cancel</button>
        </form>
    );
}

export default CancelReservation;
