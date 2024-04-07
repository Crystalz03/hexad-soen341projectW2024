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

// Get a branch by ID
router.get('/branches/:id', async (req, res) => {
  const branchID = req.params.id;

  try {
    const result = await pool.query`SELECT * FROM Branch WHERE ID = ${branchID}`;
    const branch = result.recordset[0];

    if (!branch) {
      res.status(404).json({ error: 'Branch not found' });
    } else {
      res.status(200).json({branch : branch}); 
    }
  } catch (error) {
    console.error('Error retrieving branch:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Update a specific branch by ID
router.put('/branches/:id', async (req, res) => {
  const recommendationId = req.params.id;
  const { Name, Latitude ,Longitude, Category, Address} = req.body;

  try {
    const result = await pool.query`UPDATE Recommendations SET Name = ${Name}, Latitude = ${Latitude}, Longitude = ${Longitude}, Address = ${Address} WHERE ID = ${recommendationId}`;
    res.status(200).json({ message: 'Recommendation updated successfully',  recommendation: req.body }); 
  } catch (error) {
    console.error('Error updating recommendation:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Delete a specific branch by ID
router.delete('/recommendations/:id', async (req, res) => {
  const recommendationId = req.params.id;

  try {
    const result = await pool.query`DELETE FROM Recommendations WHERE ID = ${recommendationId}`;
    res.status(200).json({ message: 'Recommendation deleted successfully' });
  } catch (error) {
    console.error('Error deleting recommendation:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});


  module.exports = router;