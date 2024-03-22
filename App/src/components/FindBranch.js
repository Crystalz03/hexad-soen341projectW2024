import React, { useState } from 'react';
import axios from 'axios';


function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  }

  function getBranches(){
    
  }
  function findNearestBranch(userLatitude, userLongitude) {

    const testBranches = [
        { name: 'Montreal Branch', latitude: 45.5019, longitude: -73.5674 },
        { name: 'Toronto Branch', latitude: 43.6532, longitude: -79.3832 },
        { name: 'Vancouver Branch', latitude: 49.2827, longitude: -123.1207 },
      ];

    let nearestBranch = null;
    let shortestDistance = Infinity;
  
    testBranches.forEach(branch => {
      const distance = calculateDistance(
        userLatitude,
        userLongitude,
        branch.latitude,
        branch.longitude
      );
      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearestBranch = branch;
      }
    });
  
    return nearestBranch;
  }

const BranchFinder = () => {

    const [apiResponse, setApiResponse] = useState(null); 
    
    const callAPIGetBranches = () => {
        fetch("http://localhost:9000/Branch", {
          method: "GET",
        })
          .then((data) => data.json())
          .then((data) => {
            const branches = data.branches[0].map((branch) => ({
              Name: branch.BranchName,
              lat: branch.LatitudeCoord,
              lng: branch.LongitudeCoord,
            }));
    
            console.log(branches)
            setApiResponse(branches);
          })
          .catch((error) => {
            console.error(error);
          });
      };
  

  const [postalCode, setPostalCode] = useState('');
  const [nearestBranch, setNearestBranch] = useState(null);

  const handlePostalCodeChange = (event) => {
    callAPIGetBranches();
    setPostalCode(event.target.value);
  };

  const findBranch = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${postalCode}&key=AIzaSyDB1QSetyBSLxtSUqBXk8SyCBE2n3-CyCA`
      );
      
      const location = response.data.results[0].geometry.location;

      setNearestBranch(findNearestBranch(location.lat, location.lng));

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
      <button onClick={findBranch}>Find Nearest Branch</button>
      {nearestBranch && (
        <div>
          <h2>Nearest Branch</h2>
          <p>Name: {nearestBranch.name}</p>
        </div>
      )}
    </div>
  );
};

export default BranchFinder;