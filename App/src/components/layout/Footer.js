// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <br/><br/>
      {/*<img src={imageSrc} alt="Footer Image" style={{ width: '100%', maxHeight: '15em', objectFit: 'cover' }} /> */}
    <div className="bg-light text-dark py-4" >
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h5>About Us</h5>
            <p>We are a car rental company dedicated to providing the best services.</p>
          </div>
          <div className="col-md-3">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" style={{ textDecoration: 'none', color: 'grey' }}>Home</Link></li>
              <li><Link to="/NewCustomer" style={{ textDecoration: 'none', color: 'grey' }}>Create an Account</Link></li>
              <li><Link to="/Browse" style={{ textDecoration: 'none', color: 'grey' }}>Browse Vehicles</Link></li>
              <li><Link to="/VehicleApplication" style={{ textDecoration: 'none', color: 'grey' }}>Recycle Your Car</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <br/>
            <ul className="list-unstyled">
              <li><Link to="/Branches" style={{ textDecoration: 'none', color: 'grey' }}>Find a Branch</Link></li>
              <li><Link to="/Reviews" style={{ textDecoration: 'none', color: 'grey' }}>Leave a Review</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Contact Us</h5>
            <address>
              1455 de Maisonneuve Blvd W<br />
              Montrreal, Qc, H3G 1M8 <br />
              <a href="mailto:hexad97@gmail.com" style={{ textDecoration: 'none', color: '#ea4c89' }}>Hexad97@gmail.com</a>
            </address>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}

export default Footer;
