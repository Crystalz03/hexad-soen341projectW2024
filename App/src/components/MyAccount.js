import React, { useState, useEffect } from 'react';

function MyAccount() {
  const [user, setUser] = useState(null); // State to store user information

  useEffect(() => {
    // Function to fetch user information when the component mounts
    const fetchUserData = async () => {
      try {
        // Make a GET request to fetch user information
        const response = await fetch(`http://localhost:9000/customers/${userId}`); // Replace userId with the actual user ID
        if (response.ok) {
          const userData = await response.json(); // Parse the JSON response
          setUser(userData.customer); // Update user state with the fetched user data
        } else {
          console.error('Error fetching user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData(); // Call the fetchUserData function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div>
      <h2>My Account</h2>
      {user && (
        <div>
          <p>Name: {user.Name}</p>
          <p>Email: {user.Email}</p>
          {/* Display other user information as needed */}
        </div>
      )}
    </div>
  );
}

export default MyAccount;
