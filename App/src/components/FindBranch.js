import React, { useState } from 'react';
import axios from 'axios';

const BranchFinder = () => {
  const [postalCode, setPostalCode] = useState('');
  const [nearestBranch, setNearestBranch] = useState(null);

  const handlePostalCodeChange = (event) => {
    setPostalCode(event.target.value);
  };

  const findNearestBranch = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${postalCode}&key=AIzaSyDB1QSetyBSLxtSUqBXk8SyCBE2n3-CyCA`
      );
      console.log('Response:', response);
      const location = response.data.results[0].geometry.location;
      console.log('Location:', location);
      // Use the location to find the nearest branch
      // You may need to make another request to your server or another API
      // to get the nearest branch based on the location
      setNearestBranch(location);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={postalCode}
        onChange={handlePostalCodeChange}
        placeholder="Enter your postal code"
      />
      <button onClick={findNearestBranch}>Find Nearest Branch</button>
      {nearestBranch && (
        <div>
          <h2>Nearest Branch</h2>
          {/* add actual branch */}
          <h2>Coordinates of postal code</h2>
          <p>Name: {nearestBranch.lat}</p>
          <p>Address: {nearestBranch.lng}</p>
          {/* Add more details if needed */}
        </div>
      )}
    </div>
  );
};

export default BranchFinder;