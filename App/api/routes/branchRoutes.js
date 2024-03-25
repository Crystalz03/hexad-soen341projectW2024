const express = require('express');
const pool = require('../../database/db');

const router = express.Router();

// Create a new branch
router.post('/branches', async (req, res) => {
    const { BranchName, LatitudeCoord, LongitudeCoord, ID, Address } = req.body;
  
    try {
      const result = await pool.query`INSERT INTO Branch (BranchName, LatitudeCoord, LongitudeCoord, ID, Adress) VALUES (${BranchName}, ${LatitudeCoord}, ${LongitudeCoord}, ${ID}, ${Address})`;
      res.status(201).json({ message: 'Branch created successfully', branch: req.body }); 
    } catch (error) {
      console.error('Error creating branch:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  });
  
  // Get all branch
  router.get('/branches', async (req, res) => {
    try {
      const result = await pool.query`SELECT * FROM Branch`;
      res.status(200).json({branch : result.recordsets}); 
    } catch (error) {
      console.error('Error retrieving branches:', error);
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
  const branchId = req.params.id;
  const { BranchName, LatitudeCoord, LongitudeCoord, Address } = req.body;

  try {
    const result = await pool.query`UPDATE Branch SET BranchName = ${BranchName}, LatitudeCoord = ${LatitudeCoord}, LongitudeCoord = ${LongitudeCoord}, Adress = ${Address} WHERE ID = ${branchId}`;
    res.status(200).json({ message: 'Branch updated successfully',  branch: req.body }); 
  } catch (error) {
    console.error('Error updating Branch:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Delete a specific branch by ID
router.delete('/branches/:id', async (req, res) => {
  const branchId = req.params.id;

  try {
    const result = await pool.query`DELETE FROM Branch WHERE ID = ${branchId}`;
    res.status(200).json({ message: 'Branch deleted successfully' });
  } catch (error) {
    console.error('Error deleting branch:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});


  module.exports = router;