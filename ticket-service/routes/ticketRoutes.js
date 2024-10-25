const express = require('express');
const router = express.Router();
const { handleTicketBooking } = require('../controllers/ticketController');

// POST route to book a ticket
router.post('/book', handleTicketBooking);

module.exports = router;
