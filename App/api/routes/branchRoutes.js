const express = require('express');
const pool = require('../../database/db');

const router = express.Router();

// Create a new branch
router.post('/branch', async (req, res) => {
    const { BranchName, LatitudeCoord, LongitudeCoord } = req.body;
  
    try {
      const result = await pool.query`INSERT INTO Branch (BranchName, LatitudeCoord, Longitude) VALUES (${BranchName}, ${LatitudeCoord}, ${LongitudeCoord})`;
      res.status(201).json({ message: 'Branch created successfully', branch: req.body }); 
    } catch (error) {
      console.error('Error creating branch:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  });
  
  // Get all branch
  router.get('/branch', async (req, res) => {
    try {
      const result = await pool.query`SELECT * FROM Branch`;
      res.status(200).json({branch : result.recordsets}); 
    } catch (error) {
      console.error('Error retrieving branches:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  });

  module.exports = router;