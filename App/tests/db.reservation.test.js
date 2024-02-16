const request = require('supertest');
const express = require('express');
const reservationRoutes = require('../api/routes/reservationRoutes');
const pool = require('../database/db');

const app = express();
app.use(express.json());
app.use(reservationRoutes);
const date = new Date();
const dateString = date.toISOString();

describe('Reservation Routes', () => {
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
  // Test the creation of a new reservation
  it('should create a new reservation', async () => {
    await pool.query`INSERT INTO Customers (ID, Name, Last_Name, Location, Email) VALUES ( 'C123456789' , 'john', 'doe', 'montreal', 'john.doe@email.com')`;
    const response = await request(app)
      .post('/reservations')
      .send({
        id: 'R123456789',
        vehicleID: 'V123456789',
        customerID: 'C123456789',
        pickUpDate: date,
        returnDate: date,
        extraEquipment: '1,2',
        additionalServices: '1',
        total: 25000.00
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Reservation created successfully');
    expect(response.body.reservation).toEqual({
        id: 'R123456789',
        vehicleID: 'V123456789',
        customerID: 'C123456789',
        pickUpDate: dateString,
        returnDate: dateString,
        extraEquipment: '1,2',
        additionalServices: '1',
        total: 25000.00
    });
    await pool.query`DELETE FROM Customers WHERE ID = 'C123456789' `;
  });

  // Test getting all resevations by customer
  it('should get all reservation by customer', async () => {
    const response = await request(app).get('/reservations/customer/C123456789');

    expect(response.status).toBe(200);
  });

  // Test getting a reservation by ID
  it('should get a reservation by ID', async () => {
    const response = await request(app).get('/reservations/R123456789');

    expect(response.status).toBe(200);
    expect(response.body.reservation).toEqual({
        ID: 'R123456789',
        Vehicle_ID: 'V123456789',
        Customer_ID: 'C123456789',
        Pick_Up_Date: dateString,
        Return_Date: dateString,
        Extra_Equipment: '1,2',
        Additional_Services: '1',
        Paid: 'false',
        Total: 25000.00

    });
  });

  // Test updating a reservation by ID
  it('should update a reservation by ID', async () => {
    const response = await request(app)
      .put('/reservations/R123456789')
      .send({
        id: 'R123456789',
        vehicleID: 'V000000000',
        customerID: 'C123456789',
        pickUpDate: date,
        returnDate: date,
        extraEquipment: '1,2,3',
        additionalEquipment: '',
        paid: 'false',
        total: 25999.00
      });

    expect(response.status).toBe(200);
    expect(response.body.reservation).toEqual({
        id: 'R123456789',
        vehicleID: 'V000000000',
        customerID: 'C123456789',
        pickUpDate: dateString,
        returnDate: dateString,
        extraEquipment: '1,2,3',
        additionalEquipment: '',
        paid: 'false',
        total: 25999.00
    });
  });

  // Test deleting a reservation by ID
  it('should delete a reservation by ID', async () => {
    const response = await request(app).delete('/reservations/R123456789');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Reservation deleted successfully');
  });
});
