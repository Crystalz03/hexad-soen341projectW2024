import React, {useEffect, useState} from "react";

function UpdateVehicleForm(props) {
    const vehicleID = props.vehicleID;
    const [formData, setFormData] = useState({
        id: '',
        type: '',
        category: '',
        model: '',
        price: '',
        availability:'',
      });
    const [error, setError] = useState("");
    const [vehicles, setVehicles] = useState([]);
  /*
    useEffect(() => {
        const fetchVehicles = async () => {
          try {
            const response = await fetch("http://localhost:9000/vehicles");
            if (!response.ok) {
              throw new Error("Failed to fetch vehicles");
            }
            const data = await response.json();
            setVehicles(data.vehicle);
          } catch (error) {
            console.error("Error fetching vehicles:", error);
            setError("Error fetching vehicles");
          }
        };
    
        fetchVehicles();
      }, []);
      
    const vehiclesArray= vehicles[0];
    
    console.log("vehicles",vehiclesArray);

    try{
    let reservedVehicle=null;
        
    console.log("vehicle reserved",formData.vehicleID);
    for (let i = 0; i < vehiclesArray.length; i++) {
      console.log("vehicles in loop",vehiclesArray[i].ID);
      if (vehiclesArray[i].ID === vehicleID) {
        reservedVehicle=vehiclesArray[i];
        break;
      }
    }
    console.log("reserved vehicle",reservedVehicle);
    if (reservedVehicle === null) {
      alert("The vehicle you selected does not exist.");
      throw new Error("The vehicle you selected does not exist.");
    } }// = vehiclesArray.find(vehicle => vehicle.ID === vehicleID);  
    catch (error) {
      console.error(error);
    }
  
    const updateInfo = async () => {
      try {
        console.log("updating vehicle info...");
        const response = await fetch(`http://localhost:9000/vehicless/${vehicleID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(info),
        });
  
        if (!response.ok) {
          throw new Error(
            "A problem occurred when creating the reservation. Please try again later."
          );
        }
        //navigate("/");
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    };*/
  
    function verifyForm() {
      
        const info={
          id: '',
          type: '',
          category: '',
          model: '',
          price: '',
          availability:'1',
        };
      
      if (apiResponse === null) {
        alert("The vehicle you selected does not exist.");
        return false;
      }
          if(formData.id ===""){
              info.id=apiResponse.ID;
            } else {info.id=formData.id;}
          if(formData.type ===""){
              info.type=apiResponse.Type;
          } else {info.type=formData.type;}
  
          if(formData.category ===""){
              info.category=apiResponse.Category;
          } else {info.category=formData.category;}
  
          if(formData.model ===""){
              info.model=apiResponse.Model;
          } else {info.model=formData.model;}
  
          if(formData.price ===""){
              info.price=apiResponse.Price;
          } else {info.price=formData.price;}
  
          if(formData.availability ===""){
              info.availability=apiResponse.Availability;
          } else {info.availability=formData.availability;}
          
          return true;
  }
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(verifyForm()){
        updateInfo();
    }
  };
  
  
    return(
      
      <div>
      <h2>Update Existing Vehicle</h2>
      <form onSubmit={handleSubmit} className="add-vehicle-form">
        <label>ID:</label>
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
        />
        <label>Type:</label>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
        />
        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
        <label>Model:</label>
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
        />
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        <label>Availability:</label>
        <input
          type="text"
          name="availability"
          value={formData.availability}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  
    );
  
  }
  

export default UpdateVehicleForm;