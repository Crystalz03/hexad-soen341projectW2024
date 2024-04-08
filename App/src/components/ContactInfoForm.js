import React from "react";
import {useState, useEffect} from "react";
function ContactInfoForm() {
    return (
        <div>
            <form className="base-form" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '30px' }}>
                <h1>Contact Information</h1>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label htmlFor="phone">Phone:</label>
                    <input type="tel" id="phone" name="phone" required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message" required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}></textarea>
                </div>

                <button type="submit" style={{ width: '100%', padding: '10px',  color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Submit</button>
            </form>
        </div>
    );
}

export default ContactInfoForm;