const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bookingRoutes = require('./routes/bookingRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Use booking routes
app.use('/api/bookings', bookingRoutes);

// Start the server
const port = process.env.PORT || 5003;
app.listen(port, () => {
    console.log(`Booking service running on port ${port}`);
});
