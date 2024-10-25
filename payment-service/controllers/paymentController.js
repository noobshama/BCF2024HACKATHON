const { sendNotificationToUser } = require('../services/paymentService');

// Controller for sending notification
async function sendNotification(req, res) {
    const { userId, message } = req.body;

    try {
        const result = await sendNotificationToUser(userId, message);
        res.status(200).json({ message: 'Notification sent successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send notification', error: error.message });
    }
}

module.exports = { sendNotification };
