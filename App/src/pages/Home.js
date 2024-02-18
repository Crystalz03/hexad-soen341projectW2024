import React from 'react';
import {Link} from "react-router-dom";
import Header from '../components/Header';
import "../style/Home.css";

function Home() {
  return (
    <div className="home">
      <Header />
      <Link to="/AdminDashboard">
        <button>Admin page test</button>
      </Link>
    </div>
    
  );
}

export default Home;