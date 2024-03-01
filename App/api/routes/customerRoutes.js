const express = require('express');
const pool = require('../../database/db');

const router = express.Router();

// Create a new customer
router.post('/customers', async (req, res) => {
  const { id, name, lastName, location, email, password} = req.body;

  try {
    const result = await pool.query`INSERT INTO Customers (ID, Name, Last_Name, Location, Email, Password) VALUES (${id}, ${name}, ${lastName}, ${location}, ${email}, ${password})`;
    res.status(201).json({ message: 'New customer created successfully', customer: req.body }); // e.g.Customer = response.body.customer -> Customer.name
  } catch (error) {
    console.error('Error creating a new customer:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

//Get customer's password
router.get('/customers/signIn/:email', async (req, res) => {
  const customerEmail = req.params.email;

  try {
    const result = await pool.query`SELECT Password FROM Customers WHERE Email = ${customerEmail}`;
    const password = result.recordsets[0][0]?.Password;;

    if (!password) {
      res.status(404).json({ error: 'Customer not found by Email' });
    } else {
      res.status(200).json({password : password}); // e.g. Password = response.body.password 
    }
  } catch (error) {
    console.error('Error finding the customer by Email:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});


// Get all customers - for system admin 
router.get('/customers', async (req, res) => {
  try {
    const result = await pool.query`SELECT * FROM Customers`;
    res.status(200).json({customers : result.recordsets}); // e.g.Customers = response.body.customers -> Customer[#].Name
  } catch (error) {
    console.error('Error finding the customers:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});



// Get a customer by email - for system admin
router.get('/customers/email/:email', async (req, res) => {
  const customerEmail = req.params.email;

  try {
    const result = await pool.query`SELECT * FROM Customers WHERE Email = ${customerEmail}`;
    const customer = result.recordset[0];

    if (!customer) {
      res.status(404).json({ error: 'Customer not found by Email' });
    } else {
      res.status(200).json({customer : customer}); // e.g.Customer = response.body.customer -> Customer.Name
    }
  } catch (error) {
    console.error('Error finding the customer by Email:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Get a customer by ID - for accounts and sessions
router.get('/customers/:id', async (req, res) => {
    const customerId = req.params.id;
  
    try {
      const result = await pool.query`SELECT * FROM Customers WHERE ID = ${customerId}`;
      const customer = result.recordset[0];
  
      if (!customer) {
        res.status(404).json({ error: 'Customer not found by ID' });
      } else {
        res.status(200).json({customer : customer}); // e.g.Customer = response.body.customer -> Customer.Name
      }
    } catch (error) {
      console.error('Error finding the customer by ID:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  });
  

// Update a specific customer by ID
router.put('/customers/:id', async (req, res) => {
  const customerId = req.params.id;
  const { name, lastName, location, email, password} = req.body;

  try {
    const result = await pool.query`UPDATE Customers SET Name = ${name}, Last_Name = ${lastName}, Location = ${location}, Email = ${email}, Password = ${password} WHERE ID = ${customerId}`;
    res.status(200).json({ message: 'Customer information updated successfully', customer: req.body }); // e.g.Customer = response.body.customer -> Customer.name
  } catch (error) {
    console.error('Error updating the customer information:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Delete a specific customer by ID
router.delete('/customers/:id', async (req, res) => {
  const customerId = req.params.id;

  try {
    const result = await pool.query`DELETE FROM Customers WHERE ID = ${customerId}`;
    res.status(200).json({ message: 'Customer removed successfully' });
  } catch (error) {
    console.error('Error removing the customer:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;