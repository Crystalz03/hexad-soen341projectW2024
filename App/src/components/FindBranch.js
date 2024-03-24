import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from './map';
import { concat } from 'rxjs';


const BranchFinder = () => {

const [apiResponse, setApiResponse] = useState(null); 
    
    const callAPIGetBranches = async () => {
      await fetch("http://localhost:9000/branches", {
          method: "GET",
        })
          .then((data) => data.json())
          .then((data) => {
            const branches = data.branch[0].map((branch) => ({
              Name: branch.BranchName,
              latitude: branch.LatitudeCoord,
              longitude: branch.LongitudeCoord,
            }));
  
            setApiResponse(branches);
            console.log(branches);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      useEffect(() => {
        callAPIGetBranches();
      }, []);

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

  function findNearestBranch(userLatitude, userLongitude) {

      // const testBranches = [
      //     { name: 'Montreal Branch', latitude: 45.5019, longitude: -73.5674 },
      //     { name: 'Toronto Branch', latitude: 43.6532, longitude: -79.3832 },
      //     { name: 'Vancouver Branch', latitude: 49.2827, longitude: -123.1207 },
      //   ];

    

    if (apiResponse === null) {
        return null; 
    }
    console.log(apiResponse);
    const testBranches = apiResponse;

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
    
  const [postalCode, setPostalCode] = useState('');
  const [nearestBranch, setNearestBranch] = useState({
    Name: "",
    latitude: 0.0,
    longitude: 0.0
  });

  const handlePostalCodeChange = (event) => {
    setPostalCode(event.target.value);
  };

  const findBranch = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${postalCode}&key=AIzaSyDB1QSetyBSLxtSUqBXk8SyCBE2n3-CyCA`
      );
      
      const location = response.data.results[0].geometry.location;

      setNearestBranch(findNearestBranch(location.lat, location.lng));
      console.log(nearestBranch)
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
          <p>Name: {nearestBranch.Name}</p>
        </div>
      )}
      <Map latitude={parseFloat(nearestBranch.latitude)} longitude={parseFloat(nearestBranch.longitude)} />
    
    </div>
  );
};

export default BranchFinder;