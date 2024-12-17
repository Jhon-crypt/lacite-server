const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Create a new booking
router.post('/bookings', bookingController.createBooking);

// Get all bookings
router.get('/bookings', bookingController.listBookings);

// Get booking counts
router.get('/bookings/counts', bookingController.getBookingCounts);

// Approve booking
router.put('/bookings/approve', bookingController.approveBooking);

// Cancel booking
router.put('/bookings/cancel', bookingController.cancelBooking);

// Get a specific booking
router.get('/bookings/:id', bookingController.getBookingById);

module.exports = router; 