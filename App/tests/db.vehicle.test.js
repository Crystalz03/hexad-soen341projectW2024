const request = require('supertest');
const express = require('express');
const vehicleRoutes = require('../api/routes/vehicleRoutes');
const pool = require('../database/db');

const app = express();
app.use(express.json());
app.use(vehicleRoutes);

describe('Vehicle Routes', () => {
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
  // Test the creation of a new vehicle
  it('should create a new vehicle', async () => {
    const response = await request(app)
      .post('/vehicles')
      .send({
        id: 'V12345',
        type: 'Sedan',
        category: 'Compact',
        model: 'Civic',
        price: 25000.00,
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Vehicle created successfully');
    expect(response.body.vehicle).toEqual({
      id: 'V12345',
      type: 'Sedan',
      category: 'Compact',
      model: 'Civic',
      price: 25000.00,
    });
  });

  // Test getting all vehicles
  it('should get all vehicles', async () => {
    const response = await request(app).get('/vehicles');

    expect(response.status).toBe(200);
  });

  // Test getting a vehicle by ID
  it('should get a vehicle by ID', async () => {
    const response = await request(app).get('/vehicles/V12345');

    expect(response.status).toBe(200);
    expect(response.body.vehicle).toEqual({
      ID: 'V12345',
      Textype: 'Sedan',
      Category: 'Compact',
      Model: 'Civic',
      Price: 25000.00,

    });
  });

  // Test updating a vehicle by ID
  it('should update a vehicle by ID', async () => {
    const response = await request(app)
      .put('/vehicles/V12345')
      .send({
        type: 'SUV',
        category: 'Midsize',
        model: 'Pilot',
        price: 35999.99,
      });

    expect(response.status).toBe(200);
    expect(response.body.vehicle).toEqual({
      type: 'SUV',
      category: 'Midsize',
      model: 'Pilot',
      price: 35999.99,
    });
  });

  // Test deleting a vehicle by ID
  it('should delete a vehicle by ID', async () => {
    const response = await request(app).delete('/vehicles/V12345');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Vehicle deleted successfully');
  });
});
