const pool = require('../config/db');

// Function to get available seats for a train
async function getAvailableSeats(train_id) {
    try {
        // Fetch all booked seats for the given train
        const bookedSeats = await pool.query(
            'SELECT seat_number FROM tickets WHERE train_id = $1 ORDER BY seat_number',
            [train_id]
        );

        const seatNumbers = bookedSeats.rows.map(row => row.seat_number);
        const trainCapacity = 200;  // Assume train capacity is fixed at 200 seats

        // Find available seats by checking which seats are not booked
        let availableSeats = [];
        for (let i = 1; i <= trainCapacity; i++) {
            if (!seatNumbers.includes(i)) {
                availableSeats.push(i);
            }
        }

        return availableSeats;
    } catch (error) {
        throw new Error('Error retrieving available seats');
    }
}

// Function to book a ticket
async function bookTicket(train_id, user_id) {
    try {
        const availableSeats = await getAvailableSeats(train_id);

        if (availableSeats.length === 0) {
            return { success: false, message: 'No seats available' };
        }

        const seatNumber = availableSeats[0];  // Assign the first available seat

        // Insert the ticket booking into the database
        await pool.query(
            'INSERT INTO tickets (train_id, user_id, seat_number) VALUES ($1, $2, $3)',
            [train_id, user_id, seatNumber]
        );

        return { success: true, seatNumber };
    } catch (error) {
        throw new Error('Error booking ticket');
    }
}

module.exports = { getAvailableSeats, bookTicket };
