// routes/userRoutes.js

const express = require('express');
const router = express.Router();


router.get('/users', (req, res) => {
  res.json({ message: 'List of users' });
});

// Add more routes as needed

module.exports = router;
