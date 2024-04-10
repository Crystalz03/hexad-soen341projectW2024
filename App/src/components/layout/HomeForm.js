import React from "react";
//removed unused imports

function HomeForm() {
    return(
        <div className="reservation-box">
        <label className="reservation-label">
          *All fields are required
        </label>
        <div className="bottom-box">
          <div className="bottom-input-boxes">
            <div className="pickup-box">
              <label className="all-caps location-title" htmlFor="location">
                Pickup*
              </label>
              <div className="top-box-input">
              <input 
                name="pickUpDate"
                required={true}
                type='date' 
                placeholder='Beginning date of reservation' 
                id='pickUpDate'
                className="form-select"
                style={{backgroundImage: 'none', paddingRight: '0.8em'}}/>

              </div>
            </div>
            <div className="return-box">
              <label className="all-caps location-title" htmlFor="location">
                Dropoff*
              </label>
              <div className="top-box-input">
              <input 
                name="dropOffDate"
                required={true}
                type='date' 
                placeholder='Return date of reservation'
                id='returnDate'
                className="form-select"
                style={{backgroundImage: 'none', paddingRight: '0.8em'}}/>
              </div>
            </div>
          </div>
          <div className="reservation-btn">
            
           
          </div>
        </div>
      </div>
    )
}
export default HomeForm;