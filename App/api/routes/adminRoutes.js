const express = require('express');
const pool = require('../../database/db');

const router = express.Router();

// Create a new System Admin service representative
router.post('/admin', async (req, res) => {
  const { id, name, lastName, email, password} = req.body;

  try {
    const result = await pool.query`INSERT INTO Admin (ID, Name, Last_Name, Email, Password) VALUES (${id}, ${name}, ${lastName}, ${email}, ${password})`;
    res.status(201).json({ message: 'New system admin  created successfully', admin: req.body }); // e.g.Admin = response.body.amin -> Admin.name
  } catch (error) {
    console.error('Error creating a new system admin :', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

//Get customer's password
router.get('/signIn/:id', async (req, res) => {
  const employeeID = req.params.id;

const regex = new RegExp(/^SA/);
let password;

  // add customer \regexp using email 

  try {
    if (regex.test(employeeID)) {
      const result = await pool.query`SELECT Password FROM Admin WHERE ID = ${employeeID}`;
      password = result.recordsets[0][0]?.Password;;
    } else {
      const result = await pool.query`SELECT Password FROM CSR WHERE ID = ${employeeID}`;
      password = result.recordsets[0][0]?.Password;;
    }

    if (!password) {
      res.status(404).json({ error: 'Employee not found by ID' });
    } else {
      res.status(200).json({password : password}); // e.g. Password = response.body.password 
    }
  } catch (error) {
    console.error('Error finding the employee by ID:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});


// Get all System Admins - for system admin 
router.get('/admin', async (req, res) => {
  try {
    const result = await pool.query`SELECT * FROM Admin`;
    res.status(200).json({admins : result.recordsets}); // e.g.Admins = response.body.admins -> Admins[#].Name
  } catch (error) {
    console.error('Error finding the system admin:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Get a System Admin by email - for system admin
router.get('/admin/email/:email', async (req, res) => {
  const adminEmail = req.params.email;

  try {
    const result = await pool.query`SELECT * FROM Admin WHERE Email = ${adminEmail}`;
    const admin = result.recordset[0];

    if (!admin) {
      res.status(404).json({error: 'System admin not found by Email' });
    } else {
      res.status(200).json({admin : admin}); // e.g.Admin = response.body.admin -> Admin.Name
    }
  } catch (error) {
    console.error('Error finding the System admin by Email:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Get a System Admin by id - for system admin
router.get('/admin/:id', async (req, res) => {
  const adminId = req.params.id;

  try {
    const result = await pool.query`SELECT * FROM Admin WHERE ID = ${adminId}`;
    const admin = result.recordset[0];

    if (!admin) {
      res.status(404).json({ error: 'System Admin not found by ID' });
    } else {
      res.status(200).json({admin : admin}); // e.g.Admin = response.body.admin -> Admin.Name
    }
  } catch (error) {
    console.error('Error finding the system admin by ID:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Update a specific System admin by ID
router.put('/admin/:id', async (req, res) => {
  const adminId = req.params.id;
  const { name, lastName, email, password} = req.body;

  try {
    const result = await pool.query`UPDATE Admin SET Name = ${name}, Last_Name = ${lastName}, Email = ${email}, Password = ${password} WHERE ID = ${adminId}`;
    res.status(200).json({ message: 'System admin information updated successfully', admin: req.body }); // e.g.Admin = response.body.admin -> Admin.name
  } catch (error) {
    console.error('Error updating the Sysetm admin information:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Delete a specific admin by ID
router.delete('/admin/:id', async (req, res) => {
  const adminId = req.params.id;

  try {
    const result = await pool.query`DELETE FROM Admin WHERE ID = ${adminId}`;
    res.status(200).json({ message: 'System admin removed successfully' });
  } catch (error) {
    console.error('Error removing the system admin:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;