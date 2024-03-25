const express = require('express');
const pool = require('../../database/db');

const router = express.Router();

// Express route for handling user sign-in
router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  try {
    let userType;
    if (username.startsWith('SA')) {
      userType = 'admin';
    } else if (username.startsWith('CR')) {
      userType = 'customer_representative';
    } else if (username.includes('@')) {
      userType = 'customer';
    } else {
      throw new Error('Invalid username');
    }

    // Query the respective database based on user type
    const user = await queryUserDatabase(userType, username);

    // Verify credentials
    if (user && user.password === password) {
      res.status(200).json({ message: 'Sign-in successful', userType, userID: user.id });
    } else {
      throw new Error('Invalid username or password');
    }
  } catch (error) {
    console.error('Sign-in error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

// Function to query user database based on user type
async function queryUserDatabase(userType, username) {
  let result;
  try {
    if (userType === 'admin') {
      result = await pool.query`SELECT * FROM Admin WHERE ID = ${username}`;
    } else if (userType === 'customer_representative') {
      result = await pool.query`SELECT * FROM CSR WHERE ID = ${username}`;
    } else if (userType === 'customer') {
      result = await pool.query`SELECT * FROM Customers WHERE Email = ${username}`;
    }
    return result.recordset[0];
  } catch (error) {
    console.error('Database query error:', error.message);
    throw new Error('Database query failed');
  }
}

module.exports = router;