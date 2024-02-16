import React from 'react';

import Home from './pages/Home';
import SignUp from './pages/SignUp';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function App() {
  return (
    <div className="app">
      
    <Router>
      <Routes> 
        <Route path="/" exact element={<Home />} />
        <Route path="/SignUp" exact element={<SignUp />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
