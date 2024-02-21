import React, { useState } from 'react';
import '../style/SignUpForm.css';

function SignupForm () {

   const [formData, setFormData] = useState({
      id: 'test',
      name: '',
      lastName: '',
      location: '',
      email: 'test2@example.com',
      password: '',
    });

    const [apiResponse, setApiResponse] = useState("");

  const callAPI = () => {
    fetch("http://localhost:9000/customers", {
      method: 'POST', // Specify the HTTP method
      headers: {
        'Content-Type': 'application/json', // Specify the content type as JSON
      },
      body: JSON.stringify(formData), // Convert the formData object to JSON
    })
      .then(res => res.json())
      .then(data => {
        console.log("API Response:", data); // Log the content of the JSON response
        setApiResponse(data); // Update state with the JSON response
      })
      .catch(error => console.error(error));
      console.log(FormData.toString());
    }

   // const validateForm = () => {} // add you form validation logic here

  const handleSubmit = (e) => {
    e.preventDefault();
    
    //if (validateForm()) {
      callAPI();
    //}
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form  onSubmit={handleSubmit}  action="Sign Up">
      <div className="form">
        <div className="split-input">
          <input type="text" id="name" name="name" required={true} placeholder="First name" onChange={handleChange}></input>
          <input type="text" id="lastName" name="lastName" required={true} placeholder="Last name" onChange={handleChange}></input>
        </div><br/>
        <input type="email" id="email" name="email" required={true} placeholder='E-mail' onChange={handleChange}></input><br/>
        <input type="text" id="location" name="location" required={true} placeholder='Location' onChange={handleChange}></input><br/>
        <input type="password" id="password" name="password" required={true} placeholder='Password' onChange={handleChange}></input><br/>
        <button>Sign Up</button>
      </div>
    </form>
  );
}

export default SignupForm;