import { useState } from 'react';
    
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

const [error, setError] = useState(""); // State to store error message
  const navigate = useNavigate();

  const callAPI = async () => {
    try {
      const response = await fetch("http://localhost:9000//reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          "A problem occured when creating the reservation. Please try again later."
        );
      }

      navigate("/");
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  const validateForm = () => {
  try{
    //finding the customer's account who made the reservation by email
    const customer = request(app).get('/customers/email/'+formData.email);

    //checking the availability of the vehicle
    const vehicle = request(app).get('/vehicles/'+formData.vehicleID);

    //creating the reservation ID
    formData.id=generateRandomString(10);
    }
          
    catch (error) {
      setError(error.message);
      console.error(error);
      return false;
    }

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

  //get all vehicles into an array
  const carArray = request(app).get('/vehicles');


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

