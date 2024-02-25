import React, { useState } from "react";


function SignIn() {
  return (
    <div>
      <input type="text" placeholder="Username" required></input>
      <input type="password" placeholder="Password" required></input>
      <button type="submit">Sign In</button>
    </div>
  );
}

export default SignIn;
