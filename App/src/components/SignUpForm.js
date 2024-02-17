import React from 'react';
import "../style/SignUpForm.css";

function SignupForm() {
  return (
    <form action="Sign Up">
      <div className="form">
        <input type="text" id="uname" name="uname" required="true" placeholder='Username'></input><br/>
        <div className="split-input">
          <input type="text" id="fname" name="fname" required="true" placeholder="First name"></input>
          <input type="text" id="lname" name="lname" required="true" placeholder="Last name"></input>
        </div><br/>
        <input type="text" id="email" name="email" required="true" placeholder='E-mail'></input><br/>
        <input type="password" id="password" name="password" required="true" placeholder='Password'></input><br/>
        <button type="submit">Sign Up</button>
      </div>
    </form>
  );
}

export default SignupForm;