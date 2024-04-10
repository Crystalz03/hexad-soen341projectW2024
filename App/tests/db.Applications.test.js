const request = require('supertest');
const express = require('express');
const applicationRoutes = require('../api/routes/applicationRoutes');
const pool = require('../database/db');

const app = express();
app.use(express.json());
app.use(applicationRoutes);

const application = {
    ID: '123456789',
    Category: 'Compact',
    Color: 'black',
    Damages: 'none',
    Make: 'Sedan',
    Model: 'Civic',
    Mileage: 10000,
    Year: 2024,
    OfferAmount: 25000,
    FirstName: 'John',
    LastName: 'Doe',
    Email:'johnDoe@gmail.com',
    Phone: '1234567890',
    Message: ''
}

describe('Application Routes', () => {
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
            console.log('Database closed successfully');
        } catch (error) {
            console.error('Error closing the database:', error);
        }
    });

    //Creating a new application
    it('should create a new application', async () => {
        const response = await request(app)
            .post('/applications')
            .send(application);
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Application created successfully');
        expect(response.body.application).toEqual(application);
    });

    //Retrieving all applications
    it('should retrieve all applications', async () => {
        const response = await request(app).get('/applications');
        expect(response.statusCode).toBe(200);
        expect(response.body.application).toBeTruthy();
    });

    //Retrieving an application by ID
    it('should retrieve an application by ID', async () => {
        const response = await request(app).get(`/applications/${application.id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.application).toEqual(application);
    });

    //Deleting an application by ID
    it('should delete an application by ID', async () => {
        const response = await request(app).delete(`/applications/${application.id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Application deleted successfully');
    });
});