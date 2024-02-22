import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

//https://youtu.be/KX7ehE0QDJM
    
  

function AddReservation() {
  
  const [formData, setFormData] = useState({
    ID: '',
    Vehicle_ID: '',
    Customer_ID: '',
    Pick_Up_Date: '',
    Return_Date: '',
    Extra_Equipment: '',
    Additional_Services: '',
    Paid: false,
    Total: '',
  });

  //ID, Vehicle_ID, Customer_ID, Pick_Up_Date, Return_Date, Extra_Equipment, Additional_Services, Paid, Total

  /*router.get('/vehicles', async (req, res) => {
  try {
    const result = await pool.query`SELECT * FROM Vehicle`;
    res.status(200).json({vehicle : result.recordsets}); // e.g. Vehicle = response.body.vehicle -> Vehicle.Name
  } catch (error) {
    console.error('Error retrieving vehicles:', error);
    res.status(500).json({ error: 'Server Error' });
  }
  });*/ 
  const [apiResponse, setApiResponse] = useState("");

  const callAPI = () => {
    fetch("http://localhost:9000/Reservation", {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), 
    })
      .then(res => res.json())
      .then(data => { setApiResponse(data);})
      .catch(error => console.error(error));
    }

  const validateForm = () => {
    return true; // add you form validation logic here use formData's values
  } // add you form validation logic here use formData's values

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      callAPI();
    }

    // maybe load into another page
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

    

  return (
      <header>

        <form onSubmit={handleSubmit}>

        <label for='first_name'>First name:</label>
        <input 
        name="first_name" 
        value={reservation.first_name || ""} 
        onChange={handleChange} 
        type="text" 
        placeholder='First name' 
        id='first_name'/>

        <label for='last_name'>Last name:</label>
        <input 
        name="last_name" 
        value={reservation.last_name || ""} 
        onChange={handleChange} 
        type="text" 
        placeholder='Last name' 
        id='last_name'/>
        <br/>

        <label for='email'>Email:</label>
        <input 
        name="email" 
        value={reservation.email || ""} 
        onChange={handleChange} 
        type='text' 
        placeholder='Email Address' 
        id='email'/><br/>


        <label for='start_reservation'>Beginning date of your reservation:</label>
        <input 
        name="start_reservation" 
        value={reservation.start_reservation || ""} 
        onChange={handleChange} 
        type='date' 
        placeholder='Beginning date of reservation' 
        id='start_resveration'/><br/>

        <label for='end_reservation'>Ending date of your reservation:</label>
        <input 
        name="end_reservation" 
        value={reservation.end_reservation || ""} 
        onChange={handleChange} 
        type='date' 
        placeholder='Ending date of reservation' 
        id='end_reservation'/><br/>
        
        <label for='type_car'>Choose your preferred type of car:</label><br/>
          <select name='type_car' id='type_car' value={reservation.type_car||""} onChange={handleChange}>
          <option value="all">All</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Semi-Truck">Semi-Truck</option>
          <option value="Van">Van</option>
          </select><br/>
        <input type='submit'></input>
    </form>
      </header>
  );
}

