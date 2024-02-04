import { useState } from 'react';
import ReactDOM from 'react-dom/client';

//reference https://www.w3schools.com/react/react_forms.asp

function show_available_cars(){

}

function reservation_form(){
    return(
        <form onSubmit={handleSubmit}>

            <label for='first_name'>First name:</label>
            <input 
            name="first_name" 
            value={inputs.username || ""} 
            onChange={handleChange} 
            type="text" 
            placeholder='First name' 
            id='first_name'/>

            <label for='last_name'>Last name:</label>
            <input name="last_name" 
            type="text" 
            placeholder='Last name' 
            id='last_name'/>
            <br/>

            <label for='email'>Email:</label>
            <input name="email" 
            type='text' 
            placeholder='Email Address' 
            id='email'/><br/>


            <label for='start_reservation'>Beginning date of your reservation:</label>
            <input 
            name="start_reservation" 
            type='date' 
            placeholder='Beginning date of reservation' 
            id='start_resveration'/><br/>

            <label for='end_reservation'>Ending date of your reservation:</label>
            <input 
            name="end_reservation" 
            type='date' 
            placeholder='Ending date of reservation' 
            id='end_reservation'/><br/>
            
            <label for='type_car'>Choose your preferred type of car:</label><br/>
            <select name='type_car' id='type_car'>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Semi-Tuck">Semi-Tuck</option>
            <option value="Van">Van</option>
            <option value="all" selected>All</option>
          </select><br/>
            <input type='submit'></input>
        </form>
    )
}