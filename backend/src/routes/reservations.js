const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Route to create a new reservation
router.post('/', reservationController.createReservation);

// Route to get all reservations for a user
router.get('/:userId', reservationController.getUserReservations);

// Route to update a reservation status
router.put('/:reservationId', reservationController.updateReservationStatus);

// Route to delete a reservation
router.delete('/:reservationId', reservationController.deleteReservation);

module.exports = router;