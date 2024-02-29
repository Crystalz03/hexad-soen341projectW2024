const request = require('supertest');
const express = require('express');
const csrRoutes = require('../api/routes/csrRoutes');
const adminRoutes = require('../api/routes/adminRoutes');
const pool = require('../database/db');

const app = express();
app.use(express.json());
app.use(csrRoutes);
app.use(adminRoutes);

describe('CSR Routes', () => {
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

  // Test the creation of a new csr
  it('should create a new csr', async () => {
    const response = await request(app)
      .post('/csr')
      .send({
        id: 'CSR1234567',
        name: 'John',
        lastName: 'Doe',
        branch: '0123456789',
        email: 'John.Doe@email.com',
        password: 'pswd123'
      });

    expect(response.status).toBe(201);
    expect(response.body.csr).toEqual({
        id: 'CSR1234567',
        name: 'John',
        lastName: 'Doe',
        branch: '0123456789',
        email: 'John.Doe@email.com',
        password: 'pswd123'
    });
  });

       // Test getting an crs's password by ID
       it('should get a csr password by ID', async () => {
        const response = await request(app).get('/signIn/CSR1234567');
    
        expect(response.status).toBe(200);
        expect(response.body.password).toEqual('pswd123');
    
      });

  // Test getting all csr
  it('should get all csr', async () => {
    const response = await request(app).get('/csr');

    expect(response.status).toBe(200);
  });

   // Test getting a csr by Email
   it('should get a csr by Email', async () => {
    const response = await request(app).get('/csr/email/John.Doe@email.com');

    expect(response.status).toBe(200);
    expect(response.body.csr).toEqual({
        ID: 'CSR1234567',
        Name: 'John',
        Last_Name: 'Doe',
        Branch: '0123456789',
        Email: 'John.Doe@email.com',
        Password: 'pswd123'
    });
});
  // Test getting a csr by ID
  it('should get a csr by ID', async () => {
    const response = await request(app).get('/csr/CSR1234567');

    expect(response.status).toBe(200);
    expect(response.body.csr).toEqual({
        ID: 'CSR1234567',
        Name: 'John',
        Last_Name: 'Doe',
        Branch: '0123456789',
        Email: 'John.Doe@email.com',
        Password: 'pswd123'
    });
  });

  // Test updating a csr by ID
  it('should update a csr by ID', async () => {
    const response = await request(app)
      .put('/csr/CSR1234567')
      .send({
        name: 'Jane',
        lastName: 'Doe',
        branch: '0123456789',
        email: 'John.Doe@email.com',
        password: 'pswd123'
      });

    expect(response.status).toBe(200);
    expect(response.body.csr).toEqual({
        name: 'Jane',
        lastName: 'Doe',
        branch: '0123456789',
        email: 'John.Doe@email.com',
        password: 'pswd123'
    });
    
  });

  // Test deleting a csr by ID
  it('should delete a csr by ID', async () => {
    const response = await request(app).delete('/csr/CSR1234567');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Customer service representative removed successfully');
  });
});
