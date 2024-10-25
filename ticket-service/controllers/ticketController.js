const { bookTicket } = require('../services/ticketService');

// Controller to handle booking requests
async function handleTicketBooking(req, res) {
    const { train_id, user_id } = req.body;

    try {
        const result = await bookTicket(train_id, user_id);

        if (result.success) {
            res.status(200).json({ message: `Ticket booked! Seat number: ${result.seatNumber}` });
        } else {
            res.status(400).json({ message: result.message });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error booking ticket', error: error.message });
    }
}

module.exports = { handleTicketBooking };
