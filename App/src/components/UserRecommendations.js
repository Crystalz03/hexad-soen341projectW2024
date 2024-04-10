import React, { useState, useEffect } from 'react';
import Map from './LocationsMap';
import { alignments } from '@floating-ui/utils';

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

function PointsInBetween({ coord1Latitude, coord1Longitude, coord2Latitude, coord2Longitude, otherCoords, threshold }) {
  const [pointsInBetween, setPointsInBetween] = useState([]);
  
  useEffect(() => {
    const findPointsInBetween = () => {
      const distanceBetweenCoords = calculateDistance(coord1Latitude, coord1Longitude, coord2Latitude, coord2Longitude);
      const result = otherCoords.filter(coord => {
        const distanceToCoord1 = calculateDistance(coord.latitude, coord.longitude, coord1Latitude, coord1Longitude);
        const distanceToCoord2 = calculateDistance(coord.latitude, coord.longitude, coord2Latitude, coord2Longitude);
        return (distanceToCoord1 + distanceToCoord2) <= (distanceBetweenCoords + threshold);
      });
      setPointsInBetween(result);
    };
    
    findPointsInBetween();
  }, [coord1Latitude, coord1Longitude, coord2Latitude, coord2Longitude, otherCoords, threshold]);

  const formattedPoints = pointsInBetween.map(coord => ({
    latitude: coord.latitude,
    longitude: coord.longitude,
    title: coord.Name, 
    address: coord.Address
  }));

  console.log(formattedPoints);
  if(formattedPoints.length != 0){
    return <Map locations={formattedPoints}></Map>;
  }
  return <Map locations={[{ latitude: 0, longitude: 0, title: '' }]}></Map>
}


const UserRecommendations = () => {

  const [apiResponse, setApiResponse] = useState(null); 
  const [selectedBranch1, setSelectedBranch1] = useState({
    Name: "",
    latitude: 0,
    longitude: 0
  });
  const [selectedBranch2, setSelectedBranch2] = useState({
    Name: "",
    latitude: 0,
    longitude: 0
  });

const [AllRecommendations, setAllRecommendations] = useState(
  [{Name: '', 
  latitude: 0, 
  longitude: 0, 
  Category: '', 
  Address: ''}]);

useEffect(() => {
    const callAPIGetRecommendations = async () => {
      try {
        const response = await fetch('http://localhost:9000/recommendations');

        if (!response.ok) {
          throw new Error('Failed to fetch branches');
        }

        const data = await response.json();
        const recommendations = data.recommendation[0].map(recommendation => ({
          Name: recommendation.Name,
          latitude: recommendation.Latitude,
          longitude: recommendation.Longitude,
          Category: recommendation.Category,
          Address: recommendation.Address
        }));

        setAllRecommendations(recommendations);
        console.log(recommendations);

      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

      callAPIGetRecommendations();

      }, []);
 
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

      const handleSubmit = event => {
        event.preventDefault();
        const selectedIndex1 = event.target.elements.branch1.selectedIndex;
        const selectedIndex2 = event.target.elements.branch2.selectedIndex;
        setSelectedBranch1(apiResponse[selectedIndex1]);
        setSelectedBranch2(apiResponse[selectedIndex2]);
      };
 
  return (
    <div >
    <div className="header">
      <h1 className="check-in-title">Travel Recommendations</h1>
      <h8 className="extra-content">Looking for some fun places to stop at during your travels? Hexad will provide you a catalogue of interesting locations that are worth visiting!</h8>
    </div>
    <div className="content">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="base-form" style={{marginBottom: '20px' }}>
          <div>
            <label htmlFor="branch1">Beparture branch:</label>
            <select name="branch1" className="form-select" style={{ width: '100%', marginBottom: '20px' }}>
              {apiResponse && apiResponse.map((branch, index) => (
                <option key={index} value={`${branch.latitude},${branch.longitude}`}>
                  {branch.Name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="branch2">Arrival branch:</label>
            <select name="branch2" className="form-select" style={{ width: '100%', marginBottom: '20px' }}>
              {apiResponse && apiResponse.map((branch, index) => (
                <option key={index} value={`${branch.latitude},${branch.longitude}`}>
                  {branch.Name}
                </option>
              ))}
            </select>
          </div>
          <button className="button-1" type="submit">Submit</button>
        </form> 
      </div>
      <div className="map-container">
      <PointsInBetween coord1Latitude={selectedBranch1.latitude} coord1Longitude={selectedBranch1.longitude} coord2Latitude={selectedBranch2.latitude} coord2Longitude={selectedBranch2.longitude} otherCoords={AllRecommendations} threshold={500} />
      </div>
    </div>
  </div>
  );
};

export default UserRecommendations;