import React, { useState } from "react";
import "../style/style.css";
import { useNavigate } from "react-router-dom";
import DisplayUserInfo from "./DisplayUserInfo";

function CheckInForm() {
    let reservationID = "";

    const [reservation, setReservation] = useState({}); 
    const [customer, setCustomer] = useState({}); 
    const [loading, setLoading] = useState(false); // Set loading initially to false

    const [error, setError] = useState("");

    const getReservation = async () => {
        setLoading(true); // Set loading to true when fetching data
        try {
            const response = await fetch(`http://localhost:9000/reservations/${reservationID}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const data = await response.json();
            const mappedReservation = {
                id: data.reservation.ID,
                vehicleID: data.reservation.Vehicle_ID,
                customerID: data.reservation.Customer_ID,
                pickUpDate: data.reservation.Pick_Up_Date,
                returnDate: data.reservation.Return_Date,
                extraEquipment: data.reservation.Extra_Equipment,
                additionalServices: data.reservation.Additional_Services,
                total: data.reservation.Total,
                pickUpLocation: data.reservation.Pick_Up_Location,
                dropOffLocation: data.reservation.Drop_Off_Location,
                mileageLimit: data.reservation.Mileage_Limit
            };
            setReservation(mappedReservation);
            getCustomer(data.reservation.Customer_ID);
        } catch (error) {
            setError("Error getting the reservation's Information");
            console.error(error);
        } finally {
            setLoading(false); // Set loading back to false when fetching is complete
        }
    };

    const getCustomer = async (customerID) => {
        setLoading(true); // Set loading to true when fetching data
        try {
            const response = await fetch(`http://localhost:9000/customers/${customerID}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const data = await response.json();
            const mappedCustomer = {
                id: data.customer.ID,
                name: data.customer.Name,
                lastName: data.customer.Last_Name,
                location: data.customer.Location,
                email: data.customer.Email,
                address: data.customer.Address,
                contactNumber: data.customer.Contact_Number,
                licenseNumber: data.customer.License_Number,
                creditCard: data.customer.Credit_Card
            };
            setCustomer(mappedCustomer);
            console.log(data)
        } catch (error) {
            setError("Error getting the customer's Information");
            console.error(error);
        } finally {
            setLoading(false); // Set loading back to false when fetching is complete
        }
    };


    const handleReservationSubmit = (e) => {
        e.preventDefault();
        getReservation();
    };

    const handleReservationIDChange = (e) => {
        const { value } = e.target;
        reservationID = value;
    };

    const handleLicenseSubmit = (e) => {
        e.preventDefault();
       console.log(customer.licenseNumber.lenght)
    };

    const handleLicenseChange = (e) => {
        const { value } = e.target;
        customer.licenseNumber = value;
    };

    const handleCreditCardChange = (e) => {
        const { value } = e.target;
        customer.CreditCard = value;
    };


    return (
        <div>
            <form onSubmit={handleReservationSubmit} action="Get Reservation">
                <div>
                    {error && <p className="error">{error}</p>}
                    <div className="split-input">
                        <input
                            type="text"
                            name="reservationID"
                            required={true}
                            placeholder="Reservation ID"
                            onChange={handleReservationIDChange}
                        />
                    </div>
                    <br />
                    <button type="submit">Start Check-in</button>
                </div>
            </form>

            {!loading && reservation.id && customer.id && 
            <div style={{ marginTop: '30px' }} >
            <DisplayUserInfo reservation={reservation} />
            </div>
            }
        </div>
    );
}

export default CheckInForm;

