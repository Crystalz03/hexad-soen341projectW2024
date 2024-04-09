import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

function UpdateVehicleForm(props) {
    const vehicleID = props.vehicleID;
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        make: '',
        category: '',
        model: '',
        price: '',
        availability:'',
        year: '',
        plateNumber: '',
        color: '',
        damages: '',
      });
    const [vehicles, setVehicles] = useState({});
    const info={
      Make: '',
      Category: '',
      Model: '',
      Price: '',
      Availability:'',
      Year: '',
      PlateNumber: '',
      Color: '',
      Damages: '',
    };
    //make, category, model, price, availability, year, plateNumber, color, damages
  
    useEffect(() => {
        const fetchVehicles = async () => {
          try {
            const response = await fetch(`http://localhost:9000/vehicles/${vehicleID}`);
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
      
    
    console.log("vehicles",vehicles);
    console.log("vehicleMake",vehicles.Make);
  
    const updateInfo = async () => {
      try {
        console.log("updating vehicle info...");
        const response = await fetch(`http://localhost:9000/vehicles/${vehicleID}`, {
          method: "PUT",
          headers: {
            "Content-make": "application/json",
          },
          body: JSON.stringify(info),
        });
  
        if (!response.ok) {
          throw new Error(
            "A problem occurred when updating the vehicle. Please try again later."
          );
        }
        alert("Vehicle updated successfully");
        console.log("Vehicle updated ", info);
        navigate("/AdminInventory");
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };
  
    function verifyForm() {
      
          if(formData.make ===""){
              info.Make=vehicles.Make;
          } else {info.Make=formData.make;}
  
          if(formData.category ===""){
              info.Category=vehicles.Category;
          } else {info.Category=formData.category;}
  
          if(formData.model ===""){
              info.Model=vehicles.Model;
          } else {info.Model=formData.model;}
          if(formData.price ===""){
              info.Price=vehicles.Price;
          } else if (formData.price<0){
              alert("Price cannot be negative");
              return false;
          }else {info.Price=formData.price;}
          if(formData.availability ===""){
              info.Availability=vehicles.Availability;
          } else {info.Availability=formData.availability;}
          if(formData.year ===""){
              info.Year=vehicles.Year;
          } else {info.Year=formData.year;}
          if(formData.plateNumber ===""){
              info.PlateNumber=vehicles.Plate_Number;
          } else {info.PlateNumber=formData.plateNumber;}
          if(formData.color ===""){
              info.Color=vehicles.Color;
          } else {info.Color=formData.color;}
          if(formData.damages ===""){
              info.Damages=vehicles.Damages;
          } else {info.Damages=formData.damages;}
          console.log("info",info);
          
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
      <form onSubmit={handleSubmit} className="base-form">
      <div  style={{ display: 'flex',marginBottom: '0px', width: '900px'}}>
          <div style={{ flex: 1, marginRight: '10px' }}>
        {error && <p className="error">{error}</p>}{" "}
          <label>Make:</label>
          <input
            type="text"
            name="make"
            value={formData.make}
            onChange={handleChange}
          />
        </div>
        <div style={{flex: 1}}>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
      </div>
      <div  style={{ display: 'flex', marginTop: '30px', marginBottom: '0px'}}>
          <div style={{ flex: 1, marginRight: '10px' }}>
          <label>Model:</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
          />
        </div>
        <div style={{flex: 1}}>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        </div>
        <div  style={{ display: 'flex', marginTop: '30px', marginBottom: '0px'}}>
          <div style={{ flex: 1, marginRight: '10px' }}>
          <label>Availability:</label>
          <input
            type="text"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
          />
        </div>
        <div style={{flex: 1}}>
          <label>Year:</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
          />
        </div>
        </div>
        <div  style={{ display: 'flex', marginTop: '30px', marginBottom: '40px'}}>
          <div style={{ flex: 1, marginRight: '10px' }}>
          <label>Plate Number:</label>
          <input
            type="text"
            name="plateNumber"
            value={formData.plateNumber}
            onChange={handleChange}
          />
        </div>
        <div style={{flex: 1}}>
          <label>Color:</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
          />
        </div>
        </div>
        <div>
          <label>Damages:</label>
          <input
            type="text"
            name="damages"
            value={formData.damages}
            onChange={handleChange}
          />
        </div>
        <br/>
          <button type="submit">Submit</button>
        </form>
      </div>
    
      );
    
    }
    

  export default UpdateVehicleForm;