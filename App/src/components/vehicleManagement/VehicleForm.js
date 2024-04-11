import React, { useState } from "react";

function VehicleForm() {
  const [formData, setFormData] = useState({
    id: "",
    make: "",
    category: "",
    model: "",
    price: "",
    availability: "1",
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
      const response = await fetch("http://localhost:9000/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        // Optionally, you can reset the form after successful submission
        setFormData({
          id: "",
          make: "",
          category: "",
          model: "",
          price: "",
          availability: "1",
        });
        setError("");
        alert("Vehicle Added Successfully!");
      } else {
        setError("Failed to create vehicle. Please try again later.");
        console.error("Failed to create vehicle:", response.statusText);
      }
    } catch (error) {
      setError(
        "An error occurred while creating the vehicle. Please try again later."
      );
      console.error("Error creating vehicle:", error);
    }
  };

  return (
    <div style={{width: '85%'}}>
      <form onSubmit={handleSubmit} className="base-form">
      <div >
          <label>
            ID:
          </label>
          <div>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
            />
            </div>
      </div>
      <div>
          <label>
            Make:
          </label>
          <div>
            <input
            type="text"
            name="make"
            value={formData.make}
            onChange={handleChange}
            required
          />
            </div>
      </div>
      <div>
          <label>
            Category:
          </label>
          <div >
            <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
            </div>
      </div>      
      <div >
          <label >
            Model:
          </label>
          <div >
            <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
          />
            </div>
      </div>
      <div>
          <label>
            Price:
          </label>
          <div>
            <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
            </div>
      </div>
        
        <br/><br/>
        <div>
        <button className="all-caps btn-background-color check-availability-button" type="submit">Submit</button>
        </div>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default VehicleForm;
