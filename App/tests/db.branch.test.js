const request = require('supertest');
const express = require('express');
const branchRoutes = require('../api/routes/branchRoutes');
const pool = require('../database/db');

const app = express();
app.use(express.json());
app.use(branchRoutes);

const branch = {
   BranchName: 'Montreal Branch', 
   LatitudeCoord: 45.5019, 
   LongitudeCoord: -73.5674, 
   ID: 0,
   Adress: "Montreal"
}

const dbBranch = {
  BranchName: 'Montreal Branch', 
   LatitudeCoord: 45.5019, 
   LongitudeCoord: -73.5674, 
   ID: 1                   ,
   Adress: "Montreal, QC"
}

const updatedBranch = {
  BranchName: 'Montreal Branch', 
   LatitudeCoord: 45.5019, 
   LongitudeCoord: -73.5674, 
   ID: 1234567890,
   Adress: "Montreal, QC"
}

describe('Branch Routes', () => {
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
  // Test the creation of a new Branch
  it('should create a new branch', async () => {
    const response = await request(app)
      .post('/branches')
      .send(branch);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Branch created successfully');
    expect(response.body.branch).toEqual(branch);
  });

  // Test getting all branches
  it('should get all branches', async () => {
    const response = await request(app).get('/branches');

    expect(response.status).toBe(200);
  });

  // Test getting a branch by ID
  it('should get a branch by ID', async () => {
    const response = await request(app).get('/branches/1                   ');

    expect(response.status).toBe(200);
    expect(response.body.branch).toEqual(dbBranch);
  });


  // Test updating a branch by ID
  it('should update a branch by ID', async () => {
    const response = await request(app)
      .put('/branches/1                   ')
      .send(updatedBranch);


    expect(response.status).toBe(200);
    expect(response.body.branch).toEqual(updatedBranch);
  });

  // Test deleting a branch by ID
  it('should delete a branch by ID', async () => {
    const response = await request(app).delete('/branches/1                   ');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Branch deleted successfully');
  });
});