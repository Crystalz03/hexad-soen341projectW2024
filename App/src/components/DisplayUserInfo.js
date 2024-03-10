import React from "react";

export default function DisplayUserInfo() {
  const[inputValue, setInputValue] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a request to your backend to fetch user info based on the provided input
      const response = await fetch(`http://localhost:9000/signIn/${formData.username}/${formData.password}         `);
      const data = await response.json();
      setUserInfo(data);
      setError("");
    } catch (err) {
      setError("User not found!");
      setUserInfo(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Email or ID"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">Get User Info</button>
      </form>
      {error && <p>{error}</p>}
      {userInfo && (
        <div>
          <h2>User Info</h2>
          <p>Email: {userInfo.email}</p>
          <p>Name: {userInfo.name}</p>
          {/* Add more user info fields as needed */}
        </div>
      )}
    </div>
  );
}
