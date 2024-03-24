import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './../style/View.css';

function ViewReservation() {
    const [reservationId, setReservationId] = useState('');
    const [reservationDetails, setReservationDetails] = useState({
        ID:"",
        Vehicle_ID:"",
        Customer_ID:"",
        Pick_Up_Date:"",
        Return_Date:"",
        Extra_Equipment:"",
        Additional_Services:"",
        Paid:"",
        Total:"",
        Pick_Up_Location:"",
        Drop_Off_Location:"", 
    });

   
    const [error, setError] = useState('');
    const [isButtonClicked, setIsButtonClicked] = useState(false); // Track whether the button is clicked or not
    const navigate = useNavigate();

    function isFormatValidReservationId(reservationId) {
        const regex = /^[A-Z]{1}\d{9}$/;
        const isValid = regex.test(reservationId);
        if (!isValid) {
            setError('The format you have entered is invalid. Please try again.');
            return false;
        }
        return true;
    }

    const callAPI = async () => {
        if (!isFormatValidReservationId(reservationId)) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:9000/reservations/${reservationId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setReservationDetails(data.reservation);
                setIsButtonClicked(true); // Set isButtonClicked to true after successful API call
            } else {
                setError(response.statusText);
                console.error('Failed to retrieve reservation:', response.statusText);
            }
        } catch (error) {
            setError('Failed to retrieve reservation. Please try again later.');
            console.error('Failed to retrieve reservation:', error);
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
                <label>
                    Reservation ID:
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
            {isButtonClicked && reservationDetails && ( // Render reservationDetails only when the button is clicked
                <div>
                    <h2>Reservation Details</h2>
                    <p>ID: {reservationDetails?.ID}</p>
                    <p>Vehicle ID: {reservationDetails?.Vehicle_ID}</p>
                    <p>Customer ID: {reservationDetails?.Customer_ID}</p>
                    <p>Pick Up Date: {reservationDetails?.Pick_Up_Date}</p>
                    <p>Return Date: {reservationDetails?.Return_Date}</p>
                    <p>Extra Equipment: {reservationDetails?.Extra_Equipment}</p>
                    <p>Additional Services: {reservationDetails?.Additional_Services}</p>
                    <p>Total: {reservationDetails?.Total}</p>
                </div>
            )}
        </div>
    );
}

export default ViewReservation;
