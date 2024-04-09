import React from 'react';
import SignInForm from '../components/SignInForm';
import { Link } from "react-router-dom";


function SignIn() {
  const apostrophe = "'";

    return (
        <div className="main-content" >
          <div className="check-in-title">Sign In</div>
          <h6>
            Don{apostrophe}t have an account? <Link to="/SignUp">Sing In</Link>
          </h6>
          <SignInForm />
        </div>
    );
  }

export default SignIn;