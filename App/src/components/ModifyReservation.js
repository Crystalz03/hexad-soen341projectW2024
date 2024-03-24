import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './../style/View.css';

function ModifyReservation() {
    const [reservationId, setReservationId] = useState('');
    const [reservationDetails, setReservationDetails] = useState(null);
    const [newVehicleId, setNewVehicleId] = useState('');
    const [newPickUpDate, setNewPickUpDate] = useState('');
    const [newReturnDate, setNewReturnDate] = useState('');
    const [newExtraEquipment, setNewExtraEquipment] = useState('');
    const [newAdditionalServices, setNewAdditionalServices] = useState('');
    const [newPickUpLocation, setNewPickUpLocation] = useState('');
    const [newDropOffLocation, setNewDropOffLocation] = useState('');
    const [error, setError] = useState('');
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setReservationDetails(null);
        setNewVehicleId('');
        setNewPickUpDate('');
        setNewReturnDate('');
        setNewExtraEquipment('');
        setNewAdditionalServices('');
        setNewPickUpLocation('');
        setNewDropOffLocation('');
        setIsButtonClicked(false);
        setError('');
    }, [reservationId]);

    async function fetchReservation() {
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
            } else {
                setError('Reservation not found');
            }
        } catch (error) {
            setError('Failed to retrieve reservation. Please try again later.');
            console.error('Failed to retrieve reservation:', error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchReservation();
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:9000/reservations/${reservationId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    vehicleID: newVehicleId || reservationDetails.Vehicle_ID,
                    pickUpDate: newPickUpDate || reservationDetails.Pick_Up_Date,
                    returnDate: newReturnDate || reservationDetails.Return_Date,
                    extraEquipment: newExtraEquipment || reservationDetails.Extra_Equipment,
                    additionalServices: newAdditionalServices || reservationDetails.Additional_Services,
                    pickUpLocation: newPickUpLocation || reservationDetails.Pick_Up_Location,
                    dropOffLocation: newDropOffLocation || reservationDetails.Drop_Off_Location,
                }),
            });

            if (response.ok) {
                setIsButtonClicked(true);
                setError('');
            } else {
                setError('Failed to update reservation');
            }
        } catch (error) {
            setError('Failed to update reservation');
            console.error('Failed to update reservation:', error);
        }
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
            {reservationDetails && (
                <div>
                    <h2>Reservation Details</h2>
                    <p>ID: {reservationDetails.ID}</p>
                    <p>Vehicle ID: {reservationDetails.Vehicle_ID}</p>
                    <p>Pick Up Date: {reservationDetails.Pick_Up_Date}</p>
                    <p>Return Date: {reservationDetails.Return_Date}</p>
                    <p>Extra Equipment: {reservationDetails.Extra_Equipment}</p>
                    <p>Additional Services: {reservationDetails.Additional_Services}</p>
                    <p>Pick-Up Location: {reservationDetails.Pick_Up_Location}</p>
                    <p>Drop-Off Location: {reservationDetails.Drop_Off_Location}</p>
                    <form onSubmit={handleUpdate}>
                        <label>
                            New Vehicle ID:
                            <input
                                type="text"
                                value={newVehicleId}
                                placeholder="Enter New Vehicle ID"
                                onChange={(e) => setNewVehicleId(e.target.value)}
                            />
                        </label><br/>
                        <label>
                            New Pick Up Date:
                            <input
                                type="date"
                                value={newPickUpDate}
                                onChange={(e) => setNewPickUpDate(e.target.value)}
                            />
                        </label><br/>
                        <label>
                            New Return Date:
                            <input
                                type="date"
                                value={newReturnDate}
                                onChange={(e) => setNewReturnDate(e.target.value)}
                            />
                        </label><br/>
                        <label>
                            New Extra Equipment:
                            <input
                                type="text"
                                value={newExtraEquipment}
                                placeholder="Enter New Extra Equipment"
                                onChange={(e) => setNewExtraEquipment(e.target.value)}
                            />
                        </label><br/>
                        <label>
                            New Additional Services:
                            <input
                                type="text"
                                value={newAdditionalServices}
                                placeholder="Enter New Additional Services"
                                onChange={(e) => setNewAdditionalServices(e.target.value)}
                            />
                        </label><br/>
                        <label>
                            New Pick-Up Location:
                            <input
                                type="text"
                                value={newPickUpLocation}
                                placeholder="Enter New Pick-Up Location"
                                onChange={(e) => setNewPickUpLocation(e.target.value)}
                            />
                        </label><br/>
                     
                        <label>
                            New Drop-Off Location:
                            <input
                                type="text"
                                value={newDropOffLocation}
                                placeholder="Enter New Drop-Off Location"
                                onChange={(e) => setNewDropOffLocation(e.target.value)}
                            />
                        </label>
                        <button type="submit">Update</button>
                    </form>
                    {isButtonClicked && <p>Reservation updated successfully!</p>}
                </div>
            )}
        </div>
    );
}

export default ModifyReservation;
