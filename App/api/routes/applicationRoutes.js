const express = require('express');
const pool = require('../../database/db');

const router = express.Router();

//Create a new application
router.post('/applications', async (req, res) => {
  const { id, category, color, damages, make, model, mileage, year, offerAmount, firstName, lastName, email, phone, message} = req.body;
    // make, model, year, color, category, price, availability, plateNumber, damages 

  try {
    const result = await pool.query`INSERT INTO Applications (ID, Category, Color, Damages, Make, Model, Mileage, Year, OfferAmount, FirstName, LastName, Email, Phone, Message) VALUES (${id}, ${category}, ${color}, ${damages}, ${make}, ${model}, ${mileage}, ${year}, ${offerAmount}, ${firstName}, ${lastName}, ${email}, ${phone}, ${message})`;
    res.status(201).json({ message: 'Application created successfully', application: req.body });
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

//get all applications
router.get('/applications', async (req, res) => {
  try {
    const result = await pool.query`SELECT * FROM Applications`;
    res.status(200).json({application : result.recordsets});
  } catch (error) {
    console.error('Error retrieving applications:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

//get application by ID
router.get('/applications/:id', async (req, res) => {
  const applicationId = req.params.id;

  try {
    const result = await pool.query`SELECT * FROM Applications WHERE ID = ${applicationId}`;
    const application = result.recordset[0];

    if (!application) {
      res.status(404).json({ error: 'Application not found' });
    } else {
      res.status(200).json({application : application});
    }
  } catch (error) {
    console.error('Error retrieving application:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

//Delete application by ID
router.delete('/applications/:id', async (req, res) => {
  const applicationId = req.params.id;

  try {
    const result = await pool.query`DELETE FROM Applications WHERE ID = ${applicationId}`;
    res.status(200).json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;