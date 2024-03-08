import { useState } from 'react';
import pool from "../../database/db";
import router from "../../api/routes/vehicleRoutes";
    
function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return result;
}  

function ReservationForm() {
  
  const [formData, setFormData] = useState({
    id: '',
    vehicleID: '',
    Customer_ID: '',
    pickUpDate: '',
    returnDate: '',
    extraEquipment: '',
    additionalServices: '',
    total: '',
  });

  const [apiResponse, setApiResponse] = useState("");

  //ID, Vehicle_ID, Customer_ID, Pick_Up_Date, Return_Date, Extra_Equipment, Additional_Services, Paid, Total
//id, vehicleID, customerID, pickUpDate, returnDate, extraEquipment, additionalServices, total

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

    //finding the customer's account who made the reservation by email
    router.get('/customers/email/:email', async (req, res) => {
      const customerEmail = req.params.email;

      try {
        const result = await pool.query`SELECT * FROM Customers WHERE Email = ${formData.email}`;
        const customer = result.recordset[0];

        if (!customer) {
          res.status(404).json({ error: 'Customer not found by Email' });
          return false;
        } else {
          res.status(200).json({customer : customer}); // e.g.Customer = response.body.customer -> Customer.Name
        }
      } catch (error) {
        console.error('Error finding the customer by Email:', error);
        res.status(500).json({ error: 'Server Error' });
        return false;
      }
    });

    //checking the availability of the vehicle
    router.get('/vehicles/:id', async (req, res) => {
      const vehicleId = req.params.id;

      try {
        const result = await pool.query`SELECT * FROM Vehicle WHERE ID = ${vehicleId}`;
        const vehicle = result.recordset[0];

        if (!vehicle) {
          res.status(404).json({ error: 'Vehicle not found' });
          return false;
        } else {
          res.status(200).json({vehicle : vehicle}); // e.g. Vehicle = response.body.vehicle -> Vehicle.Name
          if(vehicle.Availability=="available"){
            vehicle.Availability="not available";
          }
        }
      } catch (error) {
        console.error('Error retrieving vehicle:', error);
        res.status(500).json({ error: 'Server Error' });
        return false;
      }
    });

    //creating the reservation ID
    formData.id=generateRandomString(10);

    //informing the client of the successful reservation made
    alert("Reservation has been made successfully!");
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      callAPI();
    }

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  router.get('/vehicles', async (req, res) => {
    try {
      const carArray = await pool.query`SELECT * FROM Vehicles`;
      res.status(200).json({vehicle : carArray.recordsets}); // e.g. Vehicle = response.body.vehicle -> Vehicle.Name
    } catch (error) {
      console.error('Error retrieving vehicles:', error);
      res.status(500).json({ error: 'Server Error' });
      return false;
    }
  });

  return (

        <form onSubmit={handleSubmit}>

        <label>Email:</label>
        <input 
        name="email"
        required={true}
        value={formData.email || ""}
        onChange={handleChange} 
        type='text' 
        placeholder='Email Address' 
        id='email'/><br/>


        <label>Pick-up date of your reservation:</label>
        <input 
        name="pickUpDate"
        required={true}
        value={formData.pickUpDate || ""}
        onChange={handleChange} 
        type='date' 
        placeholder='Beginning date of reservation' 
        id='pickUpDate'/><br/>

        <label>Return date of your reservation:</label>
        <input 
        name="returnDate"
        required={true}
        value={formData.returnDate || ""}
        onChange={handleChange} 
        type='date' 
        placeholder='Return date of reservation'
        id='returnDate'/><br/>


        
        <label>Choose your preferred type of car:</label><br/>
          <select name='vehicleID' id='vehicleID' onChange={handleChange}>
          <>
          {carArray.map(function(car) {
            return (
                <option value={formData.vehicleID||car.id}>
                  ${car.model}
                </option>
            )
          })}
        </>
        </select><br/>
        <input type='submit'></input>
    </form>
  );
}
export default ReservationForm;

