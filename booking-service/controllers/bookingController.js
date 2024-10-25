const { bookTicket, getBookingStatus } = require('../services/bookingService');

// Controller to handle booking
async function handleBooking(req, res) {
    const { train_id, user_id } = req.body;

    try {
        const result = await bookTicket(train_id, user_id);
        if (result.success) {
            res.status(200).json({ message: `Booking successful! Seat number: ${result.seatNumber}` });
        } else {
            res.status(400).json({ message: result.message });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error processing booking', error: error.message });
    }
}

// Controller to check booking status
async function checkBookingStatus(req, res) {
    const { bookingId } = req.params;

    try {
        const status = await getBookingStatus(bookingId);
        res.status(200).json({ status });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving booking status', error: error.message });
    }
}

module.exports = { handleBooking, checkBookingStatus };
