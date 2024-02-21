import React, { useState } from 'react';
import '../style/SignUpForm.css';

function SignupForm () {

   const [formData, setFormData] = useState({
      id: '',
      name: '',
      lastName: '',
      location: '',
      email: '',
      password: '',
    });

    const [apiResponse, setApiResponse] = useState("");

  const callAPI = () => {
    fetch("http://localhost:9000/customers", {
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

   // const validateForm = () => {} // add you form validation logic here use formData's values

  const handleSubmit = (e) => {
    e.preventDefault();
    
    //if (validateForm()) {
      callAPI();
    //}

    // maybe load into another page
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