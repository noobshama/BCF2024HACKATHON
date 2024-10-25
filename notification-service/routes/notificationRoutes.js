const express = require('express');
const { sendNotification } = require('../controllers/notificationController');

const router = express.Router();

// Route to send notification
router.post('/send', sendNotification);

module.exports = router;
