const express = require('express');
const pool = require('../../database/db');

const router = express.Router();

// Create a new reservation
router.post('/reservations', async (req, res) => {
    const { id, vehicleID, customerID, pickUpDate, returnDate, extraEquipment, additionalServices, total, pickUpLocation, dropOffLocation} = req.body;
    const paid = 'false';
    const mileageLimit = "N/A";
  
    try {
      // Insert new reservation
      const result = await pool.query`INSERT INTO Reservation (ID, Vehicle_ID, Customer_ID, Pick_Up_Date, Return_Date, Extra_Equipment, Additional_Services, Paid, Total, Pick_Up_Location, Drop_Off_Location, Mileage_Limit) VALUES (${id}, ${vehicleID}, ${customerID}, ${pickUpDate}, ${returnDate}, ${extraEquipment}, ${additionalServices}, ${paid}, ${total}, ${pickUpLocation}, ${dropOffLocation}, ${mileageLimit})`;
  
      // Get existing Reservation_ID from Customer table
      const customerResult = await pool.query`SELECT Reservation_ID FROM Customers WHERE ID = ${customerID}`;
      const existingReservationID = customerResult.recordset[0].Reservation_ID;
  
      // Update Reservation_ID in Customer table by appending the new reservation ID
      const newReservationID = existingReservationID ? `${existingReservationID},${id}` : id;
      await pool.query`UPDATE Customers SET Reservation_ID = ${newReservationID} WHERE ID = ${customerID}`;
  
      res.status(201).json({ message: 'Reservation created successfully', reservation: req.body });
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
  const { vehicleID, customerID, pickUpDate, returnDate, extraEquipment, additionalServices, paid, total, pickUpLocation, dropOffLocation, mileageLimit } = req.body;

  try {
    const result = await pool.query`UPDATE Reservation SET Vehicle_ID = ${vehicleID}, Customer_ID = ${customerID}, Pick_Up_Date = ${pickUpDate}, Return_Date = ${returnDate}, Extra_Equipment = ${extraEquipment}, Additional_Services = ${additionalServices}, Paid = ${paid}, Total = ${total}, Pick_Up_Location = ${pickUpLocation}, Drop_Off_Location = ${dropOffLocation}, Mileage_Limit = ${mileageLimit} WHERE ID = ${reservationId}`;
    res.status(200).json({ message: 'Reservation updated successfully',  reservation: req.body }); // e.g. Reservation = response.body.reservation -> Reservation.name
  } catch (error) {
    console.error('Error updating reservation:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Update a specific reservation by ID
router.put('/reservations/pay/:id', async (req, res) => {
  const reservationId = req.params.id;
  const { paid } = req.body;

  try {
    const result = await pool.query`UPDATE Reservation SET Paid = ${paid} WHERE ID = ${reservationId}`;
    res.status(200).json({ message: 'Payment updated successfully',  reservation: req.body }); // e.g. Reservation = response.body.reservation -> Reservation.name
  } catch (error) {
    console.error('Error updating payment:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Delete a specific reservation by ID
router.delete('/reservations/:id', async (req, res) => {
    const reservationId = req.params.id;
  
    try {
      // Get Customer_ID 
      const customerResult = await pool.query`SELECT Customer_ID FROM Reservation WHERE ID = ${reservationId}`;
      const customerId = customerResult.recordset[0].Customer_ID;
  
      // Delete reservation
      const result = await pool.query`DELETE FROM Reservation WHERE ID = ${reservationId}`;
  
      // Get existing Reservation_ID from Customer table using the Customer's ID
      const customerResult2 = await pool.query`SELECT Reservation_ID FROM Customers WHERE ID = ${customerId}`;
      const existingReservationID = customerResult2.recordset[0].Reservation_ID;
  
      // Remove the deleted reservation ID from Reservation_ID in Customer table
      const updatedReservationID = existingReservationID
        ? existingReservationID.split(',').filter(id => id !== reservationId).join(',')
        : '';
  
      // Update Reservation_ID in Customer table
      await pool.query`UPDATE Customers SET Reservation_ID = ${updatedReservationID} WHERE ID = ${customerId}`;
  
      res.status(200).json({ message: 'Reservation deleted successfully' });
    } catch (error) {
      console.error('Error deleting Reservation:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  });
  
  

module.exports = router;