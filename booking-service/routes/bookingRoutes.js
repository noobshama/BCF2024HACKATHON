const express = require('express');
const router = express.Router();
const { handleBooking, checkBookingStatus } = require('../controllers/bookingController');

// Route to handle booking requests
router.post('/', handleBooking);

// Route to check the booking status
router.get('/:bookingId/status', checkBookingStatus);

module.exports = router;
