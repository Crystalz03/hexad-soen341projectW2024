import React from 'react';

function Signup() {
  return (
    <form action="Sign Up">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required="true"></input>
        <br/>


    </form>
  );
}

export default Signup;