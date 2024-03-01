
import React, { useState } from 'react';




function isFormatValidConfirmationNumber(confNumber) {
    const regex=/^[A-Z]{1}\d{9}$/;
    const isValid=regex.test(confNumber);
    if(!isValid) {
        console.log("The format you have entered is invalid. Please try again.");
        return false;
    }
    return true;

}


function CancelReservationForm() {

    const [confirmationNumber, setConfirmationNumber] = useState('');

    const handleSubmit = (e) => { // onSubmit it will make the make the API call 
        e.preventDefault(); // prevent empty values. might need to remove it for some forms
        //if (validateForm()) {
        callAPI();
        // add redirection to another pager
        //}
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
            onChange={handleChange}
            placeholder="Enter Confirmation Number"
            required
          />
      </label>
        
        <button type="submit">Cancel</button>
   
    </form>
  );
}
export default CancelReservationForm;