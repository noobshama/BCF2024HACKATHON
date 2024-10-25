const pool = require('../config/db');

// Service to send notification to user
async function sendNotificationToUser(userId, message) {
    try {
        const result = await pool.query(
            'INSERT INTO notifications (user_id, message) VALUES ($1, $2) RETURNING *',
            [userId, message]
        );
        return result.rows[0];
    } catch (error) {
        throw new Error('Failed to send notification');
    }
}

module.exports = { sendNotificationToUser };
