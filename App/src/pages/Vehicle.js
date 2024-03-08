
import React, { useState, useEffect } from 'react';
import "./../style/style.css";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
    
const VehicleForm = () => {

  
 /*fetch("http://localhost:9000/vehicles", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: 'V123456789',
              type: 'Sedan',
              category: 'Compact',
              model: 'Civic',
              price: 25000.00,
            }),
          }).then(res => res.json())
          .then(data => {
            console.log("API Response:", data); //!!FOR DEBUGGING ONLY remove the log when done 
          })
          .catch(error => console.error(error));*/

          
    const [formData, setFormData] = useState({
      id: '',
      type: '',
      category: '',
      model: '',
      price: '',
      availability: '',
    });

    const [apiResponse, setApiResponse] = useState(""); 
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const CallAPISet =  (e) => {
      console.log('Submitted Data:', formData);

          fetch("http://localhost:9000/vehicles", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }).then(res => res.json()).then(data => {
            console.log("API Response:", data); 
            setApiResponse(data); // Update state with the JSON response
          }).catch(error => console.error(error));

      callAPIGet();
      
      setFormData({
        id: '',
        type: '',
        category: '',
        model: '',
        price: '',
        availability: '',
      });
      
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      CallAPISet();
    }

    const callAPIGet = () => {
      fetch("http://localhost:9000/vehicles", {
        method: 'GET', 
      })
        .then(data => data.json())
        .then(data => {console.log(data.vehicle[0][0].ID); // always keep data.vehicle[0] this will return you an arrray with all the vehilce
          setApiResponse(data                              // data.vehicle[0] => array of vehicles -- data.vehicle[0][0] => 1st vehicle in the list -- data.vehicle[0][0].ID == ID 
          )})
        .catch(error => console.error(error));
    };

    return (
      <div>
        
      <Header/>
      <aside className="nav sticky">
          <div className="company-name-nav all-caps">hexad</div>
          <ul className="nav-list-1">
            <li className="nav-list-components-1">Sign In/Sign Up</li>
            <li className="nav-list-components-1">About Hexad</li>
            <li className="nav-list-components-1">Reserve</li>
            <li className="nav-list-components-1">View/Cancel/Modify
            </li>
          </ul>
          <div className="nav-divider"></div>
          <ul className="nav-list-2">
            <li className="nav-list-components-2 current-page">
              Browse Vehicles
            </li>
            <li className="nav-list-components-2">Locations</li>
            <li className="nav-list-components-2">Contact Us</li>
          </ul>
          <div className="nav-divider"></div>
        </aside>
        <div className="main-content">
           <form class="form-1" onSubmit={handleSubmit}>
      <h2 class="form-header">Create New Vehicle</h2>
        <label>
          ID:
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </label>
        <br />
  
        <label>
          Type:
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </label>
        <br />
  
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </label>
        <br />
  
        <label>
          Model:
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
          />
        </label>
        <br />
  
        <label>
          Price:
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Availibility:
          <input
            type="text"
            name="availibility"
            value={formData.availability}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button class="button-1" role="button" type="submit">Submit</button>
      </form>

        </div>
     
      <div>
      <BrowseVehicles  />
    </div>

      <Footer></Footer>
      </div>
    );
  };

function MyForm() {
  return (
    <form>
      <label>Enter your name:
        <input type="text" />
      </label>
    </form>
  )
}
function BrowseVehicles() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const callAPIGet = async () => {
      const response = await fetch("http://localhost:9000/vehicles", {
        method: 'GET', 
      })
        .then(data => data.json())
        .then(data => {console.log(data.vehicle[0][0].ID); // always keep data.vehicle[0] this will return you an arrray with all the vehilce
          setApiResponse(data                              // data.vehicle[0] => array of vehicles -- data.vehicle[0][0] => 1st vehicle in the list -- data.vehicle[0][0].ID == ID 
          )})
        .catch(error => console.error(error));

        const data = await response.json();
        setVehicles(data.vehicle);
    };

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
      }
    };

    fetchVehicles();
  }, []);

  return (
    <div>
      <Main vehicles={vehicles} />
    </div>
  );
}

function Main({ vehicles }) {

  return (
    <div className="main">
      <div className="general-structure">
      <div className="main-content">
          <h2>Browse Vehicles</h2>
          <ul>
            {vehicles.map((vehicle) => (
              <li key={vehicle.ID}>
                <div>ID: {vehicle.id}</div>
                <div>Type: {vehicle.type}</div>
                <div>Category: {vehicle.category}</div>
                <div>Model: {vehicle.model}</div>
                <div>Price: {vehicle.price}</div>
                <div>
                  <button class="button-1">Edit</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}



export default VehicleForm;