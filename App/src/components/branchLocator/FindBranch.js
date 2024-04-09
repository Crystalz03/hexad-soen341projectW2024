import React, { useState, useEffect } from 'react';
import Map from './map';

const BranchFinder = ({map}) => {

const [showMap, setShowMap] = useState(map);
const [apiResponse, setApiResponse] = useState(null); 
const [postalCode, setPostalCode] = useState('');
const [nearestBranch, setNearestBranch] = useState({
    Name: '',
    latitude: 0.0,
    longitude: 0.0
  });
 
useEffect(() => {
    const callAPIGetBranches = async () => {
      try {
        const response = await fetch('http://localhost:9000/branches');

        if (!response.ok) {
          throw new Error('Failed to fetch branches');
        }

        const data = await response.json();
        const branches = data.branch[0].map(branch => ({
          Name: branch.BranchName,
          latitude: branch.LatitudeCoord,
          longitude: branch.LongitudeCoord
        }));

        setApiResponse(branches);

      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };

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

    if (apiResponse === null) {
        return null; 
    }
    
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
      setShowMap(true);
    });
  
    return nearestBranch;
  }

  const handlePostalCodeChange = (event) => {
    setPostalCode(event.target.value);
  };

  const findBranch = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${postalCode}&key=AIzaSyDB1QSetyBSLxtSUqBXk8SyCBE2n3-CyCA`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch location data');
      }
      const data = await response.json();
      const { lat, lng } = data.results[0].geometry.location;
      setNearestBranch(findNearestBranch(lat, lng));
  

    } catch (error) {
      console.error('Error fetching data:', error);
    }
   
  };
 
  return (

      <div>
        <div>
          <div className="top-box-input">
          <input
            type="text"
            value={postalCode}
            onChange={handlePostalCodeChange}
            placeholder="Enter your postal code"
          />
          </div>
          
          <button className="all-caps sign-in-btn btn-background-color reserve-btn check-availability-button" onClick={findBranch}>Find Nearest Branch</button>
          {nearestBranch.Name ? (
            <div>
              
              <p>Name: {nearestBranch.Name}</p>
            
            </div>
          ) :null}
          {showMap ? 
          <div>
            <Map 
              latitude={parseFloat(nearestBranch.latitude)}
              longitude={parseFloat(nearestBranch.longitude)}
            /> 
            </div> : null}
        </div>
      </div>

  );
};

export default BranchFinder;