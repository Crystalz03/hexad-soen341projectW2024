import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';


function app() {
  return (
    <div className="app">
      
    <Router>
      <Routes> 
        <Route path="/" exact element={<Home />} />
        <Route path="/SignUp" exact element={<SignUp />} />
        <Route path="/SignIn" exact element={<SignIn />} />
      </Routes>
    </Router>
    </div>
  );
}

export default app;
