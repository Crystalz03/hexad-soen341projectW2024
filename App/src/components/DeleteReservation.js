import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function DeleteReservation() {
    const [reservationId, setReservationId] = useState('');
    const [error, setError] = useState(null); 
    const navigate = useNavigate();
    
    const isFormatValidReservationId = (id) => {
    
        return true; 
    }

    const handleChange = (e) => {
        setReservationId(e.target.value);
    };

    const handleSubmit = async (e) => { 
        e.preventDefault(); 
        if (!isFormatValidReservationId(reservationId)) {
            setError("Invalid reservation ID format");
            return;
        }
        try {
            const response = await fetch(`http://localhost:9000/reservations/${reservationId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            if (response.ok) {
                console.log('Reservation successfully deleted');
                // Optionally, you can navigate to another page or perform additional actions upon successful deletion
                navigate('/'); 
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

export default DeleteReservation;
