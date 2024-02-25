import React, { useState } from "react";

function SignIn() {
  //const []
  return (
    <div>
      <input type="text" placeholder="Username" required></input>
      <input type="password" placeholder="Password" required></input>
      <button type="submit">Sign In</button>
    </div>
  );
}

export default SignIn;
