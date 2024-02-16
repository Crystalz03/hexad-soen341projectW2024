const express = require('express');
const pool = require('../../database/db');

const router = express.Router();

// Create a new reservation
router.post('/reservations', async (req, res) => {
  const { id, vehicleID, customerID, pickUpDate, returnDate, extraEquipment, additionalServices, total} = req.body;
  const paid = 'false';

  try {
    const result = await pool.request().query`INSERT INTO Reservation (ID, Vehicle_ID, Customer_ID, Pick_Up_Date, Return_Date, Extra_Equipment, Additional_Services, Paid, Total) VALUES (${id}, ${vehicleID}, ${customerID}, ${pickUpDate}, ${returnDate}, ${extraEquipment}, ${additionalServices}, ${paid}, ${total})`;
    res.status(201).json({ message: 'Reservation created successfully', reservation: req.body }); // e.g. Reservation = response.body.reservation -> Reservation.name
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Get all reservation by user
router.get('/reservations/customer/:customerId', async (req, res) => {
    const customerId = req.params.customerId;

    try {
      const result = await pool.query`SELECT * FROM Reservation WHERE ID = ${customerId}`;
      const reservations = result.recordsets;
  
      if (!reservations) {
        res.status(404).json({ error: 'Reservations not found' });
      } else {
        res.status(200).json({reservations : reservations}); // e.g. Reservations = response.body.reservations -> Reservations[#].Name
      }
    } catch (error) {
      console.error('Error retrieving reservation:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  });

// Get a reservation by ID
router.get('/reservations/:id', async (req, res) => {
  const reservationId = req.params.id;

  try {
    const result = await pool.query`SELECT * FROM Reservation WHERE ID = ${reservationId}`;
    const reservation = result.recordset[0];

    if (!reservation) {
      res.status(404).json({ error: 'Reservation not found' });
    } else {
      res.status(200).json({reservation : reservation}); // e.g. Reservation = response.body.reservation -> Reservation.Name
    }
  } catch (error) {
    console.error('Error retrieving reservation:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Update a specific reservation by ID
router.put('/reservations/:id', async (req, res) => {
  const reservationId = req.params.id;
  const { vehicleID, userID, pickUpDate, returnDate, extraEquipment, additionalServices, paid, total } = req.body;

  try {
    const result = await pool.query`UPDATE Reservation SET Vehicle_ID = ${vehicleID}, User_ID = ${vehicleID}, Pick_Up_Date = ${pickUpDate}, Return_Date = ${returnDate}, Extra_Equipment = ${extraEquipment}, Additional_Services = ${additionalServices}, Paid = ${paid}, Total = ${total} WHERE ID = ${reservationId}`;
    res.status(200).json({ message: 'Reservation updated successfully',  reservation: req.body }); // e.g. Reservation = response.body.reservation -> Reservation.name
  } catch (error) {
    console.error('Error updating reservation:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Delete a specific reservation by ID
router.delete('/reservations/:id', async (req, res) => {
  const reservationId = req.params.id;

  try {
    const result = await pool.query`DELETE FROM Reservation WHERE ID = ${reservationId}`;
    res.status(200).json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    console.error('Error deleting Reservation:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;