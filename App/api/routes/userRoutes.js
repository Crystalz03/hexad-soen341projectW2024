// userRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../../database/db');

const router = express.Router();
const saltRounds = 10;

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user into the database
    const result = await db.query`INSERT INTO customer (username, password) VALUES (${username}, ${hashedPassword})`;

    res.json({ message: 'User registered successfully', userId: result.insertId });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Retrieve user from the database
    const user = await db.query`SELECT * FROM users WHERE username = ${username}`;

    if (user.recordset.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Compare the provided password with the hashed password in the database
    const match = await bcrypt.compare(password, user.recordset[0].password);

    if (match) {
      res.json({ message: 'User logged in successfully', userId: user.recordset[0].id });
    } else {
      res.status(401).json({ error: 'Invalid password' });
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
