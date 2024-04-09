const express = require('express');
const pool = require('../../database/db');

const router = express.Router();

// Create a new recommendations
router.post('/recommendations', async (req, res) => {
    const { Name, Latitude ,Longitude, Category, Address} = req.body;
  
    try {
      const result = await pool.query`INSERT INTO Branch (Name, Latitude ,Longitude, Category, Address) VALUES (${Name}, ${Latitude}, ${Longitude}, ${Category}, ${Address})`;
      res.status(201).json({ message: 'Recommended location created successfully', branch: req.body }); 
    } catch (error) {
      console.error('Error creating new recommended location:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  });
  
  // Get all recommendations
  router.get('/recommendations', async (req, res) => {
    try {
      const result = await pool.query`SELECT * FROM Recommendations`;
      res.status(200).json({recommendation : result.recordsets}); 
    } catch (error) {
      console.error('Error retrieving recommendation:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  });


  module.exports = router;