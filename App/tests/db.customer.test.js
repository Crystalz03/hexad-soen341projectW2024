const request = require('supertest');
const express = require('express');
const customerRoutes = require('../api/routes/customerRoutes');
const pool = require('../database/db');

const app = express();
app.use(express.json());
app.use(customerRoutes);

describe('Customers Routes', () => {
    beforeAll(async () => {
      try {
        await pool.connect();
        console.log('Database connected successfully');
      } catch (error) {
        console.error('Error connecting to the database:', error);
      }
    });
  
    afterAll(async () => {
      try {
        await pool.close();
        console.log('Database connection closed');
      } catch (error) {
        console.error('Error closing the database connection:', error);
      }
    });

  // Test the creation of a new customer
  it('should create a new customer', async () => {
    const response = await request(app)
      .post('/customers')
      .send({
        id: 'C123456789',
        name: 'John',
        lastName: 'Doe',
        location: 'Montreal',
        email: 'John.Doe@email.com',
        password: 'pswd123'
      });

    expect(response.status).toBe(201);
    expect(response.body.customer).toEqual({
        id: 'C123456789',
        name: 'John',
        lastName: 'Doe',
        location: 'Montreal',
        email: 'John.Doe@email.com',
        password: 'pswd123'
    });
  });

    // Test getting a customer's password by Email
    it('should get a customer password by Email', async () => {
      const response = await request(app).get('/customers/signIn/John.Doe@email.com');
  
      expect(response.status).toBe(200);
      expect(response.body.password).toEqual('pswd123');
  
    });

  // Test getting all customers
  it('should get all customers', async () => {
    const response = await request(app).get('/customers');

    expect(response.status).toBe(200);
  });

  // Test getting a customer by Email
  it('should get a customer by Email', async () => {
    const response = await request(app).get('/customers/email/John.Doe@email.com');

    expect(response.status).toBe(200);
    expect(response.body.customer).toEqual({
        ID: 'C123456789',
        Name: 'John',
        Last_Name: 'Doe',
        Location: 'Montreal',
        Email: 'John.Doe@email.com',
        Reservation_ID: null,
        Password: 'pswd123'
    });

  });

  // Test getting a customer by ID
  it('should get a customer by ID', async () => {
    const response = await request(app).get('/customers/C123456789');

    expect(response.status).toBe(200);
    expect(response.body.customer).toEqual({
        ID: 'C123456789',
        Name: 'John',
        Last_Name: 'Doe',
        Location: 'Montreal',
        Email: 'John.Doe@email.com',
        Reservation_ID: null,
        Password: 'pswd123'
    });


  });

  // Test updating a customer by ID
  it('should update a customer by ID', async () => {
    const response = await request(app)
      .put('/customers/C123456789')
      .send({
        name: 'Jane',
        lastName: 'Doe',
        location: 'Quebec',
        email: 'John.Doe@email.com',
        password: 'pswd123'
      });

    expect(response.status).toBe(200);
    expect(response.body.customer).toEqual({
        name: 'Jane',
        lastName: 'Doe',
        location: 'Quebec',
        email: 'John.Doe@email.com',
        password: 'pswd123'
    });
    
  });

  // Test deleting a customer by ID
  it('should delete a customer by ID', async () => {
    const response = await request(app).delete('/customers/C123456789');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Customer removed successfully');
  });
});
