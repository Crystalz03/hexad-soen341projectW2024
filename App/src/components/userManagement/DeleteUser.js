import React, { useState, useEffect } from 'react';
import { getUser, getUserRole } from './DisplayUserInfo';
import { useNavigate } from 'react-router';

export default function DeleteUser() {
  const [error, setError] = useState('');
  const [user, setUser] = useState(getUser());
  const [userType, setUserType]=useState('');
  const [signedIn, setSignedIn] = useState(false);
  const navigate= useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setUserType(getUserRole(user.id)); // Use user.id directly
    }
  }, [user]);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setSignedIn(false);
    navigate("/");
  };



  const handleDeleteUser = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');

    if (confirmed) {
      const userInfo = getUser(); // Get user information
      const userId = userInfo.id; // Assuming user ID is needed for deletion

      try {
        let url;
        switch (userType) {
          case 'customer':
            url = `http://localhost:9000/customers/${userId}`;
            break;
          case 'customer_representative':
            url = `http://localhost:9000/csr/${userId}`;
            break;
          case 'admin':
            url = `http://localhost:9000/admin/${userId}`;
            break;
          default:
            throw new Error('Invalid user type');
        }

        const response = await fetch(url, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Successful deletion
          alert(`${userType.toUpperCase()} deleted successfully`);
          handleSignOut(); // Sign out the user
        } else {
          setError('Error deleting user');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        setError('Error deleting user');
      }
    }
  };

  return (
    <div>
      <button className="btn btn-primary" style={{backgroundColor: '#ea4c89', border: '#ea4c89', color: 'white'}} onClick={handleDeleteUser}>Delete Account</button>
      {error && <p>{error}</p>}
    </div>
  );
}
