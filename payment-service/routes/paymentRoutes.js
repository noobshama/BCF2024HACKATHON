const express = require('express');
const router = express.Router();
const { processPayment } = require('../services/paymentService');

// POST route to process a payment
router.post('/process', async (req, res) => {
    const { userId, amount, paymentMethod } = req.body;
    try {
        const result = await processPayment(userId, amount, paymentMethod);
        res.status(200).json({ message: 'Payment processed', paymentId: result.paymentId });
    } catch (error) {
        res.status(500).json({ message: 'Failed to process payment', error: error.message });
    }
});

module.exports = router;
