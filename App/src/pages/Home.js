import React from 'react';
import {Link} from "react-router-dom";

function Home() {
  return (
    <div>Home Page
    <Link to="/SignUp">
        <button>Sign Up</button>
    </Link>
    </div>
    
  );
}

export default Home;