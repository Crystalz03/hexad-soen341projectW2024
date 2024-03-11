import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './../style/Cancel.css';


function CancelReservation() {
    const [reservationId, setReservationId] = useState('');
    const [error, setError] = useState(null); 
    const navigate = useNavigate();
    
    const isFormatValidReservationId = (id) => {
        // Add your validation logic here if needed
        return true; // For simplicity, assuming format is always valid
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
                alert('Reservation successfully deleted');
                // Optionally, you can navigate to another page or perform additional actions upon successful deletion
                setError('');
                navigate('/'); // Example: Navigate to homepage
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

export default CancelReservation;

// function CancelReservationForm() {
//     const [confirmationNumber, setConfirmationNumber] = useState('');
//     const [error, setError] = useState(null); 
//     const navigate = useNavigate();
    
//     const isFormatValidConfirmationNumber = (confirmationNumber) => {
//         const regex = /^[A-Z]{1}\d{9}$/;
//         const isValid = regex.test(confirmationNumber);
//         if (!isValid) {
//             setError("The format you have entered is invalid. Please try again.");
//             return false;
//         }
//         return true;
//     }

//     const handleChange = (e) => {
//         setConfirmationNumber(e.target.value);
//     };

//     const handleSubmit = async (e) => { 
//         e.preventDefault(); 
//         if (!isFormatValidConfirmationNumber(confirmationNumber)) {
//             return;
//         }
//         try {
//             const response = await fetch(`http://localhost:9000/reservations/${confirmationNumber}`, {
//                 method: "DELETE",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 console.log('Reservation successfully canceled');
     
//             } else {
//                 setError('Failed to cancel reservation. Please try again later.');
//                 console.error('Failed to cancel reservation:', response.statusText);
//             }
//         } catch (error) {
//             setError('An error occurred while cancelling the reservation. Please try again later.');
//             console.error('Error cancelling reservation:', error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} action="CancelR">
//             <label> Confirmation Number:
//                 <input
//                     type="text"
//                     value={confirmationNumber} 
//                     placeholder="Enter Confirmation Number"
//                     required
//                     onChange={handleChange}
//                 />
//             </label>
//             {error && <p className="error">{error}</p>}
//             <button type="submit">Cancel</button>
//         </form>
//     );
// }

// export default CancelReservationForm;
// INSERT INTO dbo.Reservation(ID, Vehicle_ID, Customer_ID, Pick_Up_Date,Return_Date,Extra_Equipment,Additional_Services, Paid, Total)
// VALUES ('ejndiw3rf', 'test', 'test', '2024-03-13 00:00:00.0000000','2024-03-15 00:00:00.0000000', '', '', 1, 1000);