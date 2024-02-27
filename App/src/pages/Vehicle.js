
import React, { useState } from 'react';
import "./../style/style.css";

const VehicleForm = () => {
    const [formData, setFormData] = useState({
      id: '',
      type: '',
      category: '',
      model: '',
      price: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Submitted Data:', formData);
      setFormData({
        id: '',
        type: '',
        category: '',
        model: '',
        price: '',
      });
    };
  
    return (
      <label> Create New Vehicle
      <form onSubmit={handleSubmit}>
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
  
        <button type="submit">Submit</button>
      </form>
      </label>
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




export default VehicleForm;