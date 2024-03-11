import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './../style/View.css';

function ViewReservation() {
    const [reservationId, setReservationId] = useState('');
    const [reservationDetails, setReservationDetails] = useState(null);
    const [error, setError] = useState(null); 
    const navigate = useNavigate();
    
    function isFormatValidReservationId(reservationId) {
        // const regex=/^[A-Z]{1}\d{9}$/;
        // const isValid=regex.test(reservationId);
        // if(!isValid) {
        //     setError("The format you have entered is invalid. Please try again.");
        //     return false;
        // }
        return true;
    }

    const callAPI = async () => {
        if (!isFormatValidReservationId(reservationId)) {
            return;
        }
        
        try {
            const response = await fetch(`http://localhost:9000/reservations/${reservationId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            
            if (response.ok){
                const data = await response.json();
                setReservationDetails(data.reservation);
                console.log(data.reservation);
            } else {
                setError(response.statusText);
                console.error('Failed to retrieve reservation:', response.statusText);
            }
            
        } catch (error) {
            setError(error.message);
            console.error(error);
        }
    };

    const handleSubmit = (e) => { 
        e.preventDefault(); 
        callAPI();
    };
    
    const handleChange = (e) => {
        setReservationId(e.target.value);
    };

    return (
        <div>
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
                <button type="submit">View</button>
            </form>
            {error && <p className="error">{error}</p>}
            {reservationDetails && (
                <div>
                    <h2>Reservation Details</h2>
                    <p>ID: {reservationDetails.id}</p>
                    <p>Vehicle ID: {reservationDetails.vehicleID}</p>
                    <p>Customer ID: {reservationDetails.customerID}</p>
                    <p>Pick Up Date: {reservationDetails.pickUpDate}</p>
                    <p>Return Date: {reservationDetails.returnDate}</p>
                    <p>Extra Equipment: {reservationDetails.extraEquipment}</p>
                    <p>Additional Services: {reservationDetails.additionalServices}</p>
                    <p>Total: {reservationDetails.total}</p>
                </div>
            )}
        </div>
    );
}

export default ViewReservation;
