const express = require('express');
const pool = require('../../database/db');

const router = express.Router();

// Create a new vehicle
router.post('/vehicles', async (req, res) => {
  const { id, type, category, model, price } = req.body;

  try {
    const result = await pool.request().query`INSERT INTO Vehicle (ID, Type, Category, Model, Price) VALUES (${id}, ${type}, ${category}, ${model}, ${price})`;
    res.status(201).json({ message: 'Vehicle created successfully', vehicle: req.body }); // e.g. Vehicle = response.body.vehicle -> Vehicle.name
  } catch (error) {
    console.error('Error creating vehicle:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Get all vehicles
router.get('/vehicles', async (req, res) => {
  try {
    const result = await pool.query`SELECT * FROM Vehicle`;
    res.status(2002).json({vehicle : result.recordset[0]}); // e.g. Vehicle = response.body.vehicle -> Vehicle.Name
  } catch (error) {
    console.error('Error retrieving vehicles:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Get a vehicle by ID
router.get('/vehicles/:id', async (req, res) => {
  const vehicleId = req.params.id;

  try {
    const result = await pool.query`SELECT * FROM Vehicle WHERE ID = ${vehicleId}`;
    const vehicle = result.recordset[0];

    if (!vehicle) {
      res.status(404).json({ error: 'Vehicle not found' });
    } else {
      res.status(200).json({vehicle : vehicle}); // e.g. Vehicle = response.body.vehicle -> Vehicle.Name
    }
  } catch (error) {
    console.error('Error retrieving vehicle:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Update a specific vehicle by ID
router.put('/vehicles/:id', async (req, res) => {
  const vehicleId = req.params.id;
  const { type, category, model, price } = req.body;

  try {
    const result = await pool.query`UPDATE Vehicle SET Type = ${type}, Category = ${category}, Model = ${model}, Price = ${price} WHERE ID = ${vehicleId}`;
    res.status(200).json({ message: 'Vehicle updated successfully' }); // e.g. Vehicle = response.body.vehicle -> Vehicle.name
  } catch (error) {
    console.error('Error updating vehicle:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Delete a specific vehicle by ID
router.delete('/vehicles/:id', async (req, res) => {
  const vehicleId = req.params.id;

  try {
    const result = await pool.query`DELETE FROM Vehicle WHERE ID = ${vehicleId}`;
    res.status(200).json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;