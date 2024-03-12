const request = require('supertest');
const express = require('express');
const adminRoutes = require('../api/routes/adminRoutes');
const pool = require('../database/db');

const app = express();
app.use(express.json());
app.use(adminRoutes);

describe('System Admin Routes', () => {
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

  // Test the creation of a new system admin
  it('should create a new system admin', async () => {
    const response = await request(app)
      .post('/admin')
      .send({
        id: 'SA12345678',
        name: 'John',
        lastName: 'Doe',
        email: 'John.Doe@email.com',
        password: 'pswd123'
      });

    expect(response.status).toBe(201);
    expect(response.body.admin).toEqual({
        id: 'SA12345678',
        name: 'John',
        lastName: 'Doe',
        email: 'John.Doe@email.com',
        password: 'pswd123'
    });
  });

     // Test admin Login 
     it('should test login states', async () => {

      // successful
      var response = await request(app).get('/signIn/SA12345678/pswd123');
  
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Login successful');
      expect(response.body.id).toEqual('SA12345678');

      // incorrect password
      response = await request(app).get('/signIn/SA12345678/pswd1234');
  
      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('Incorrect password');

      // not found
      response = await request(app).get('/signIn/SSA12345678/pswd123');
  
      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('User not found');
  
    });

  // Test getting all system admin
  it('should get all system admin', async () => {
    const response = await request(app).get('/admin');

    expect(response.status).toBe(200);
  });

   // Test getting a system admin by Email
   it('should get a system admin by Email', async () => {
    const response = await request(app).get('/admin/email/John.Doe@email.com');

    expect(response.status).toBe(200);
    expect(response.body.admin).toEqual({
        ID: 'SA12345678',
        Name: 'John',
        Last_Name: 'Doe',
        Email: 'John.Doe@email.com',
        Password: 'pswd123'
    });
});
  // Test getting a system admin by ID
  it('should get a system admin by ID', async () => {
    const response = await request(app).get('/admin/SA12345678');

    expect(response.status).toBe(200);
    expect(response.body.admin).toEqual({
        ID: 'SA12345678',
        Name: 'John',
        Last_Name: 'Doe',
        Email: 'John.Doe@email.com',
        Password: 'pswd123'
    });
  });

  // Test updating a system admin by ID
  it('should update a system admin by ID', async () => {
    const response = await request(app)
      .put('/admin/SA12345678')
      .send({
        name: 'Jane',
        lastName: 'Doe',
        email: 'John.Doe@email.com',
        password: 'pswd123'
      });

    expect(response.status).toBe(200);
    expect(response.body.admin).toEqual({
        name: 'Jane',
        lastName: 'Doe',
        email: 'John.Doe@email.com',
        password: 'pswd123'
    });
    
  });

  // Test deleting a system admin by ID
  it('should delete a system admin by ID', async () => {
    const response = await request(app).delete('/admin/SA12345678');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('System admin removed successfully');
  });
});
