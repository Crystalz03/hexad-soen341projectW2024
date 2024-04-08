import { useState, useEffect } from "react";

function EstimationForm() {
    return (
        <div className="form-container">
            <form>
                <h1>Estimation Form</h1>
                
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required/>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required/>
                <label htmlFor="phone">Phone:</label>
                <input type="tel" id="phone" name="phone" required/>
                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" required></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default EstimationForm;