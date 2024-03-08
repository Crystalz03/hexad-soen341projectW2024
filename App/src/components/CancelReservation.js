
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './../style/Cancel.css';



function CancelReservationForm() {

    const [confirmationNumber, setConfirmationNumber] = useState('');
    const [error, setError] = useState(null); 
    const navigate = useNavigate();
    
    function isFormatValidConfirmationNumber(confirmationNumber) {
    const regex=/^[A-Z]{1}\d{9}$/;
    const isValid=regex.test(confirmationNumber);
    if(!isValid) {
        setError("The format you have entered is invalid. Please try again.");
        return false;
    }

    return true;

    }


    const callAPI = async () => {
      if (!isFormatValidConfirmationNumber(confirmationNumber)) {
        return; // Do not proceed with API call if format is invalid
    }

        try {
          const response = await fetch(`http://localhost:9000/reservationRoute/${confirmationNumber}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
    
          });
    
          const data = await response.json();
    
          if (response.ok){
            console.log('Reservation successfully canceled');
           }
           else { setError(response.statusText);
             console.error('Failed to cancel reservation:', response.statusText);}
        
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
        setConfirmationNumber(e.target.value);
      };

return (
    <form  onSubmit={handleSubmit}  action="CancelR">
      <label> Confirmation Number:
      <input
            type="text"
            value={confirmationNumber} 
            placeholder="Enter Confirmation Number"
            required
            onChange={handleChange}
          ></input>
      </label>
        
        <button type="submit">Cancel</button>
   
    </form>
  );
}
export default CancelReservationForm;