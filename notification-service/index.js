const express = require('express');
const dotenv = require('dotenv');
const notificationRoutes = require('./routes/notificationRoutes');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Notification routes
app.use('/api/notifications', notificationRoutes);

// Start the server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
    console.log(`Notification service running on port ${PORT}`);
});
