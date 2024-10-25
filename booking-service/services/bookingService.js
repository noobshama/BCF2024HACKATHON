const pool = require('../config/db');
const axios = require('axios'); // For calling external services

// Book a ticket by assigning the first available seat
async function bookTicket(train_id, user_id) {
    try {
        // Check available seats by calling the train service
        const availableSeatsResponse = await axios.get(`http://train-service:5000/api/trains/${train_id}/available-seats`);
        const availableSeats = availableSeatsResponse.data.seats;

        if (availableSeats.length === 0) {
            return { success: false, message: 'No seats available' };
        }

        const seatNumber = availableSeats[0]; // First available seat

        // Create the booking in the database
        await pool.query(
            'INSERT INTO bookings (train_id, user_id, seat_number) VALUES ($1, $2, $3)',
            [train_id, user_id, seatNumber]
        );

        // Send a payment request to the payment service
        await axios.post('http://payment-service:5005/api/payments', { train_id, user_id });

        return { success: true, seatNumber };
    } catch (error) {
        throw new Error('Error booking ticket');
    }
}

// Get booking status
async function getBookingStatus(bookingId) {
    try {
        const result = await pool.query('SELECT payment_status FROM bookings WHERE id = $1', [bookingId]);
        return result.rows[0].payment_status ? 'Paid' : 'Pending Payment';
    } catch (error) {
        throw new Error('Error retrieving booking status');
    }
}

module.exports = { bookTicket, getBookingStatus };
