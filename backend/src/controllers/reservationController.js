// reservationController.js

const { Reservation } = require('../models');

// Create a new reservation
exports.createReservation = async (req, res) => {
    try {
        const { userId, offerId, quantity } = req.body;
        const secureCode = generateSecureCode(); // Function to generate a secure code
        const newReservation = new Reservation({
            user_id: userId,
            offer_id: offerId,
            quantity,
            secure_code: secureCode,
            status: 'pending',
        });

        const savedReservation = await newReservation.save();
        res.status(201).json(savedReservation);
    } catch (error) {
        res.status(500).json({ message: 'Error creating reservation', error });
    }
};

// Get all reservations for a user
exports.getUserReservations = async (req, res) => {
    try {
        const { userId } = req.params;
        const reservations = await Reservation.find({ user_id: userId });
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reservations', error });
    }
};

// Mark a reservation as collected
exports.collectReservation = async (req, res) => {
    try {
        const { secureCode } = req.body;
        const reservation = await Reservation.findOne({ secure_code: secureCode });

        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        reservation.status = 'collected';
        await reservation.save();
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message: 'Error collecting reservation', error });
    }
};

// Function to generate a secure code
const generateSecureCode = () => {
    return `RET-${Math.floor(1000 + Math.random() * 9000)}`; // Example code generation
};