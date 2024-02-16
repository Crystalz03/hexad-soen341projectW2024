const express = require('express');
const pool = require('../../database/db');

const router = express.Router();

// Create a new customer service representative
router.post('/csr', async (req, res) => {
  const { id, name, lastName, branch, email} = req.body;

  try {
    const result = await pool.request().query`INSERT INTO CSR (ID, Name, Last_Name, Branch, Email) VALUES (${id}, ${name}, ${lastName}, ${branch}, ${email})`;
    res.status(201).json({ message: 'New customer service representative created successfully', csr: req.body }); // e.g.CSR = response.body.csr -> CSR.name
  } catch (error) {
    console.error('Error creating a new customer service representative:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Get all csr - for system admin 
router.get('/csr', async (req, res) => {
  try {
    const result = await pool.query`SELECT * FROM CSR`;
    res.status(200).json({csr : result.recordsets}); // e.g.CSR = response.body.csr -> CSR[#].Name
  } catch (error) {
    console.error('Error finding the customer service representative:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Get a csr by email - for system admin
router.get('/csr/email/:email', async (req, res) => {
  const csrEmail = req.params.email;

  try {
    const result = await pool.query`SELECT * FROM CSR WHERE Email = ${csrEmail}`;
    const csr = result.recordset[0];

    if (!csr) {
      res.status(404).json({ error: 'Customer service representative not found by Email' });
    } else {
      res.status(200).json({csr : csr}); // e.g.CSR = response.body.csr -> CSR.Name
    }
  } catch (error) {
    console.error('Error finding the customer service representative by Email:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Get a csr by id - for system admin
router.get('/csr/:id', async (req, res) => {
  const csrId = req.params.id;

  try {
    const result = await pool.query`SELECT * FROM CSR WHERE ID = ${csrId}`;
    const csr = result.recordset[0];

    if (!csr) {
      res.status(404).json({ error: 'Customer service representative not found by ID' });
    } else {
      res.status(200).json({csr : csr}); // e.g.CSR = response.body.csr -> CSR.Name
    }
  } catch (error) {
    console.error('Error finding the customer service representative by ID:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Update a specific csr by ID
router.put('/csr/:id', async (req, res) => {
  const csrId = req.params.id;
  const { name, lastName, branch, email} = req.body;

  try {
    const result = await pool.query`UPDATE CSR SET Name = ${name}, Last_Name = ${lastName}, Branch = ${branch}, Email = ${email} WHERE ID = ${csrId}`;
    res.status(200).json({ message: 'Customer service representative information updated successfully', csr: req.body }); // e.g.CSR = response.body.csr -> CSR.name
  } catch (error) {
    console.error('Error updating the customer service representative information:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Delete a specific csr by ID
router.delete('/csr/:id', async (req, res) => {
  const csrId = req.params.id;

  try {
    const result = await pool.query`DELETE FROM CSR WHERE ID = ${csrId}`;
    res.status(200).json({ message: 'Customer service representative removed successfully' });
  } catch (error) {
    console.error('Error removing the customer service representative:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;