const request = require('supertest');
const express = require('express');
const vehicleRoutes = require('../api//vehicleRoutes');

// Create an Express app and use the vehicleRoutes
const app = express();
app.use(express.json());
app.use('/', vehicleRoutes);

describe('Vehicle Routes', () => {
  // Test the creation of a new vehicle
  it('should create a new vehicle', async () => {
    const response = await request(app)
      .post('/vehicles')
      .send({
        id: 'V123',
        type: 'Sedan',
        category: 'Compact',
        model: 'Civic',
        price: 25000,
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Vehicle created successfully');
    expect(response.body.vehicle).toEqual({
      id: 'V123',
      type: 'Sedan',
      category: 'Compact',
      model: 'Civic',
      price: 25000,
    });
  });

  // Test retrieving all vehicles
  it('should retrieve all vehicles', async () => {
    const response = await request(app).get('/vehicles');

    expect(response.status).toBe(200);
    // Add more assertions based on the expected response for retrieving all vehicles
  });

  // Test retrieving a vehicle by ID
  it('should retrieve a vehicle by ID', async () => {
    const response = await request(app).get('/vehicles/V123');

    expect(response.status).toBe(200);
    // Add more assertions based on the expected response for retrieving a vehicle by ID
  });

  // Test updating a vehicle by ID
  it('should update a vehicle by ID', async () => {
    const response = await request(app)
      .put('/vehicles/V123')
      .send({
        type: 'SUV',
        category: 'Midsize',
        model: 'Pilot',
        price: 35000,
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Vehicle updated successfully');
  });

  // Test deleting a vehicle by ID
  it('should delete a vehicle by ID', async () => {
    const response = await request(app).delete('/vehicles/V123');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Vehicle deleted successfully');
  });
});
