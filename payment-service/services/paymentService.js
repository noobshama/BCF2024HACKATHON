const pool = require('../config/db');

// Service to process a payment
async function processPayment(userId, amount, paymentMethod) {
    const result = await pool.query(
        'INSERT INTO payments (user_id, amount, payment_method, payment_status) VALUES ($1, $2, $3, $4) RETURNING id',
        [userId, amount, paymentMethod, 'completed']
    );
    return { paymentId: result.rows[0].id };
}

module.exports = { processPayment };
