const request = require('supertest');
const express = require('express');
const recommendationsRoutes = require('../api/routes/recommendationsRoutes');
const pool = require('../database/db');

const app = express();
app.use(express.json());
app.use(recommendationsRoutes);

const testRecommendation = {
   Name: 'Test recommended location', 
   Latitude: 45, 
   Longitude: -73, 
   Category: 'Test category',
   Address: 'Test Address'
}

describe('Recommendations Routes', () => {
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

  // Test the creation of a new recommendation
  it('should create a new recommended location', async () => {
    const response = await request(app)
      .post('/recommendations')
      .send(testRecommendation);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Recommended location created successfully');
    expect(response.body.recommendation).toEqual(testRecommendation);
  });

  // Test getting all recommendations
  it('should get all recommended locations', async () => {
    const response = await request(app).get('/recommendations');

    expect(response.status).toBe(200);
  });

});