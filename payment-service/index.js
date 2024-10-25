const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const paymentRoutes = require('./routes/paymentRoutes');

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Use routes for payments
app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 5004;

app.listen(PORT, () => {
    console.log(`Payment service running on port ${PORT}`);
});
