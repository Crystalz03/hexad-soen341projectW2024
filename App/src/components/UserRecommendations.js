import React, { useState, useEffect } from 'react';
import Map from './map';

function calculateDistance(lat1, lon1, lat2, lon2) { //using the Haversine formula to compute distance
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;  // Convert degrees to radians
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
}


function PointsInBetween({ coord1, coord2, otherCoords, threshold }) {
  const [pointsInBetween, setPointsInBetween] = useState([]);

  const findPointsInBetween = () => {
      const distanceBetweenCoords = calculateDistance(coord1[0], coord1[1], coord2[0], coord2[1]);
      const result = otherCoords.filter(coord => {
          const distanceToCoord1 = calculateDistance(coord1[0], coord1[1], coord[0], coord[1]);
          const distanceToCoord2 = calculateDistance(coord2[0], coord2[1], coord[0], coord[1]);
          return (distanceToCoord1 + distanceToCoord2) <= (distanceBetweenCoords + threshold);
      });
      setPointsInBetween(result);
  };

  // Call findPointsInBetween when component mounts
  useState(() => {
      findPointsInBetween();
  }, []);

  
  return (
    <div>
        <h2>Points in between the two coordinates within {threshold} km:</h2>
        <ul>
            {pointsInBetween.map((point, index) => (
                <li key={index}>{point[0]}, {point[1]}</li>
            ))}
        </ul>
    </div>
);
}

const UserRecommendations = () => {


  const [apiResponse, setApiResponse] = useState(null); 
  const [selectedBranch1, setSelectedBranch1] = useState(null);
  const [selectedBranch2, setSelectedBranch2] = useState(null);
 
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

      const handleBranch1Select = event => {
        const selectedIndex = event.target.selectedIndex;
        setSelectedBranch1(apiResponse[selectedIndex]);
      };
    
      const handleBranch2Select = event => {
        const selectedIndex = event.target.selectedIndex;
        setSelectedBranch2(apiResponse[selectedIndex]);
      };
    
      const handleSubmit = event => {
        event.preventDefault();
        console.log('Selected Branch 1:', selectedBranch1);
        console.log('Selected Branch 2:', selectedBranch2);
      };
 
  return (
    <div className="main">
    <div className="general-structure">
      <div className="main-content" style={{ height: '500px', overflowY: 'auto' }}>
        <div className="title-box">
          <div className="reservation-title">Get recommendations</div>
        </div>
        <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="branch1">Branch 1:</label>
              <select name="branch1" onChange={handleBranch1Select}>
                {apiResponse && apiResponse.map((branch, index) => (
                  <option key={index} value={`${branch.latitude},${branch.longitude}`}>
                    {branch.Name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="branch2">Branch 2:</label>
              <select name="branch2" onChange={handleBranch2Select}>
                {apiResponse && apiResponse.map((branch, index) => (
                  <option key={index} value={`${branch.latitude},${branch.longitude}`}>
                    {branch.Name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit">Submit</button>
          </form>
      </div>
    </div>
  </div>
  );
};

export default UserRecommendations;