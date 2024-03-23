const request = require('supertest');
const express = require('express');
const customerRoutes = require('../api/routes/customerRoutes');
const adminRoutes = require('../api/routes/adminRoutes');
const pool = require('../database/db');

const app = express();
app.use(express.json());
app.use(customerRoutes);
app.use(adminRoutes);

const customer = {
  id: 'C123456789',
  name: 'John',
  lastName: 'Doe',
  location: 'Montreal',
  email: 'John.Doe@email.com',
  password: 'pswd123',
  address: '1445 Blvd. De Maisonneuve Ouest',
  contactNumber: '438-000-0000',
  licenseNumber: 'L0000-000000-00',
}

const dbCustomer = {
  ID: 'C123456789',
  Name: 'John',
  Last_Name: 'Doe',
  Location: 'Montreal',
  Email: 'John.Doe@email.com',
  Password: 'pswd123',
  Address: '1445 Blvd. De Maisonneuve Ouest',
  Contact_Number: '438-000-0000',
  License_Number: 'L0000-000000-00',
  Reservation_ID: null,
  Credit_Card: 'N/A'
}

const updatedCustomer = {
  name: 'Jane',
  lastName: 'Doe',
  location: 'Quebec',
  email: 'John.Doe@email.com',
  password: 'pswd123',
  address: '1445 Blvd. De Maisonneuve Ouest',
  contactNumber: '438-111-1111',
  licenseNumber: 'L1111-111111-11',
  creditCard: "0000 0000 0000 0000"
}

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
      .send(customer);

    expect(response.status).toBe(201);
    expect(response.body.customer).toEqual(customer);
  });

     // Test customer Login 
     it('should test login states', async () => {

      // successful
      var response = await request(app).get('/signIn/John.Doe@email.com/pswd123');
  
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Login successful');
      expect(response.body.id).toEqual(`C123456789`);

      // incorrect password
      response = await request(app).get('/signIn/John.Doe@email.com/pswd1234');
  
      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('Incorrect password');

      // not found
      response = await request(app).get('/signIn/John.Doe@email.coms/pswd123');
  
      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('User not found');
  
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
    expect(response.body.customer).toEqual(dbCustomer);

  });

  // Test getting a customer by ID
  it('should get a customer by ID', async () => {
    const response = await request(app).get('/customers/C123456789');

    expect(response.status).toBe(200);
    expect(response.body.customer).toEqual(dbCustomer);


  });

  // Test updating a customer by ID
  it('should update a customer by ID', async () => {
    const response = await request(app)
      .put('/customers/C123456789')
      .send(updatedCustomer);

    expect(response.status).toBe(200);
    expect(response.body.customer).toEqual(updatedCustomer);
    
  });

  // Test deleting a customer by ID
  it('should delete a customer by ID', async () => {
    const response = await request(app).delete('/customers/C123456789');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Customer removed successfully');
  });
});
