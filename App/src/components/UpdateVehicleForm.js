import React, { useState } from 'react';

function updateVehicle() {


    const [formData, setFormData] = useState({
        id: '',
        type: '',
        category: '',
        model: '',
        price: '',
        availability:'1',
      });
      const [info, setInfo] = useState({
        id: '',
        type: '',
        category: '',
        model: '',
        price: '',
        availability:'1',
      });
    
      const [error, setError] = useState(null);
      const [vehicles, setVehicles] = useState([[{}]]);

      
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await fetch("http://localhost:9000/vehicles");
        if (!response.ok) {
          throw new Error("Failed to fetch vehicles");
        }
        const data = await response.json();
        setVehicles(data.vehicle);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setError("Error fetching vehicles");
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);
  
  

  const vehiclesArray= vehicles[0];

  function verifyForm() {
    

  let selectedVehicle=null;
    for (let i = 0; i < vehiclesArray.length; i++) {
      if (vehiclesArray[i].ID === formData.id) {
        selectedVehicle=vehiclesArray[i];
        break;
      }
    }
    if (selectedVehicle === null) {
      alert("The vehicle you selected does not exist.");
      return false;
    }
        if(formData.type ===""){
            info.type=selectedVehicle.Type;
        } else {info.type=formData.type;}

        if(formData.category ===""){
            info.category=selectedVehicle.Category;
        } else {info.category=formData.category;}

        if(formData.model ===""){
            info.model=selectedVehicle.Model;
        } else {info.model=formData.model;}

        if(formData.price ===""){
            info.price=selectedVehicle.Price;
        } else {info.price=formData.price;}

        if(formData.availability ===""){
            info.availability=selectedVehicle.Availability;
        } else {info.availability=formData.availability;}
        
        return true;
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
  };

    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if(verifyForm(vehicleID)){
            updateInfo();
        }
      };
    
      return (
        <div>
          <h2>Update Existing Vehicle</h2>
          <form onSubmit={handleSubmit} className="add-vehicle-form">
            <label>ID:</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required={true}
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
            <button type="submit">Submit</button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      );
    

}

export default updateVehicle;