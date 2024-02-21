
// For Post and Get methods
import React, { useState } from 'react';

function SignupForm () { // change to  your component's name

   const [formData, setFormData] = useState({ //change the variable names to SAME use in the api/routes/... file 
      id: '',
      name: '',
      lastName: '',
      location: '',
      email: '',
      password: '',
    });

    const [apiResponse, setApiResponse] = useState(""); // don't touch

  const callAPI = () => {
    fetch("http://localhost:9000/customers", { // always http://localhost:9000/...  the (...) can be found in the api/routes/... files
      method: 'POST', // Specify the HTTP method (foud in the api/routes/... files)
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(formData), // Convert the formData object to JSON
    })
      .then(res => res.json())
      .then(data => {
        console.log("API Response:", data); //!!FOR DEBUGGING ONLY remove the log when done
        setApiResponse(data); // Update state with the JSON response
      })
      .catch(error => console.error(error)); // Error handling
    }

   // const validateForm = () => {} // add you form validation logic here use formData. values

  const handleSubmit = (e) => { // onSubmit it will make the make the API call 
    e.preventDefault(); // prevent empty values. might need to remove it for some forms
    //if (validateForm()) {
      callAPI();
      // add redirection to another pager
    //}
  };

  const handleChange = (e) => { // this method is necessary to be able to update the value in formData... just don't touch it... and don't forget to add it to the form
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

// Get methods... coming soon... hopefully...