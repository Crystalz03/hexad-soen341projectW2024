import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

//https://youtu.be/KX7ehE0QDJM
    
  

function App() {

    const express = require('express');
    const sql = require('mssql');

    const app = express();
    const port = 3000;

    const pool = new sql.ConnectionPool(dbConfig);

    pool.connect()
      .then(() => {
        console.log('Connected to the database');
      })
      .catch((err) => {
        console.error('Error connecting to the database:', err);
      });

  const [reservation, setReservation] = useState({});
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
       setReservation(values=>({...values, [name]: value}))
    }
    const handleSubmit = (event)=>{
        event.preventDefault();
        alert(reservation);
    }

  return (
      <header>

        <form onSubmit={handleSubmit}>

        <label for='first_name'>First name:</label>
        <input 
        name="first_name" 
        value={reservation.first_name || ""} 
        onChange={handleChange} 
        type="text" 
        placeholder='First name' 
        id='first_name'/>

        <label for='last_name'>Last name:</label>
        <input 
        name="last_name" 
        value={reservation.last_name || ""} 
        onChange={handleChange} 
        type="text" 
        placeholder='Last name' 
        id='last_name'/>
        <br/>

        <label for='email'>Email:</label>
        <input 
        name="email" 
        value={reservation.email || ""} 
        onChange={handleChange} 
        type='text' 
        placeholder='Email Address' 
        id='email'/><br/>


        <label for='start_reservation'>Beginning date of your reservation:</label>
        <input 
        name="start_reservation" 
        value={reservation.start_reservation || ""} 
        onChange={handleChange} 
        type='date' 
        placeholder='Beginning date of reservation' 
        id='start_resveration'/><br/>

        <label for='end_reservation'>Ending date of your reservation:</label>
        <input 
        name="end_reservation" 
        value={reservation.end_reservation || ""} 
        onChange={handleChange} 
        type='date' 
        placeholder='Ending date of reservation' 
        id='end_reservation'/><br/>
        
        <label for='type_car'>Choose your preferred type of car:</label><br/>
          <select name='type_car' id='type_car' value={reservation.type_car||""} onChange={handleChange}>
          <option value="all">All</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Semi-Truck">Semi-Truck</option>
          <option value="Van">Van</option>
          </select><br/>
        <input type='submit'></input>
    </form>
      </header>
  );
}

