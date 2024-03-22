import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import View from "./pages/View";
import SignUp from "./pages/SignUp";
import AdminDashboard from "./pages/AdminDashboard";
import CreateCRAccount from "./pages/CreateCRAccount";
import SignIn from "./pages/SignIn";
import Cancel from "./pages/Cancel";
import Modify from "./pages/Modify"; 

function App() {
  const [apiResponse, setApiResponse] = useState("");

  const callAPI = () => {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => setApiResponse(res))
      .catch(error => console.error('Error fetching data:', error));
  };

  const callAPI2 = () => {
    fetch("http://localhost:9000/vehicles", {
      method: 'GET', 
    })
      .then(data => data.json())
      .then(data => setApiResponse(data))
      .catch(error => console.error(error));
  };

  useEffect(() => {
    callAPI();
    callAPI2();
  }, []);

  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/View">View</Link>
            </li>
            <li>
              <Link to="/Modify">Modify</Link>
            </li>
            <li>
              <Link to="/Cancel">Cancel</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/Cancel" exact element={<Cancel />} />
          <Route path="/View" exact element={<View />} />
          <Route path="/Modify" exact element={<Modify />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
