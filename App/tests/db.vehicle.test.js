const request = require('supertest');
const express = require('express');
const vehicleRoutes = require('../api/routes/vehicleRoutes');
const pool = require('../database/db');

const app = express();
app.use(express.json());
app.use(vehicleRoutes);

const vehicle = {
  id: 'V123456789',
  make: 'Sedan',
  category: 'Compact',
  model: 'Civic',
  price: 25000.00,
  availability: 'available',
  year: 2024,
  plateNumber: 'AAA 000',
  color: 'black',
  damages: 'N/A'
}

const dbVehicle = {
  ID: 'V123456789',
  Make: 'Sedan',
  Category: 'Compact',
  Model: 'Civic',
  Price: 25000.00,
  Availability: 'available',
  Year: 2024,
  Plate_Number: 'AAA 000',
  Color: 'black',
  Damages: 'N/A'
}

const updatedVehicle = {
  make: 'SUV',
  category: 'Midsize',
  model: 'Pilot',
  price: 35999.99,
  availability: 'not available',
  year: 2023,
  plateNumber: '000 AAA',
  color: 'blue',
  damages: 'scratches'
}

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
      .send(vehicle);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Vehicle created successfully');
    expect(response.body.vehicle).toEqual(vehicle);
  });

  // Test getting all vehicles
  it('should get all vehicles', async () => {
    const response = await request(app).get('/vehicles');

    expect(response.status).toBe(200);
  });

  // Test getting a vehicle by ID
  it('should get a vehicle by ID', async () => {
    const response = await request(app).get('/vehicles/V123456789');

    expect(response.status).toBe(200);
    expect(response.body.vehicle).toEqual(dbVehicle);
  });

  // Test updating a vehicle by ID
  it('should update a vehicle by ID', async () => {
    const response = await request(app)
      .put('/vehicles/V123456789')
      .send(updatedVehicle);


    expect(response.status).toBe(200);
    expect(response.body.vehicle).toEqual(updatedVehicle);
  });

  // Test deleting a vehicle by ID
  it('should delete a vehicle by ID', async () => {
    const response = await request(app).delete('/vehicles/V123456789');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Vehicle deleted successfully');
  });
});