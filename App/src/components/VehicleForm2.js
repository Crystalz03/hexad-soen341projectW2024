import React, { useState, useEffect } from 'react';
import "./../style/style.css";
    
function VehicleForm() {
                                                                                                                                                                                                          
    
  const [formData, setFormData] = useState({
    id: '',
    type: '',
    category: '',
    model: '',
    price: '',
    availability:'1',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9000/vehicles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        setFormData({
          id: '',
          type: '',
          category: '',
          model: '',
          price: '',
          availability:'1',
        });
        setError('');
        alert("Vehicle Added Successfully!");
      } else {
        setError('Failed to create vehicle. Please try again later.');
        console.error('Failed to create vehicle:', response.statusText);
      }
    } catch (error) {
      setError('An error occurred while creating the vehicle. Please try again later.');
      console.error('Error creating vehicle:', error);
    }
  };


    return (
      <div>
      
        <div className="main-content">
           <form className="form-1" onSubmit={handleSubmit}>
      <h2 className="form-header">Create New Vehicle</h2>
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
        {error && <p className="error">{error}</p>}
        <button className="button-1" role="button" type="submit">Submit</button>
      </form>
    </div>
      </div>
    );
  };


export default VehicleForm;