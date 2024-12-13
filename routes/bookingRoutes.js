const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Create a new booking
router.post('/bookings', bookingController.createBooking);

// Get all bookings
router.get('/bookings', bookingController.listBookings);

// Get a specific booking
router.get('/bookings/:id', bookingController.getBookingById);

module.exports = router; 