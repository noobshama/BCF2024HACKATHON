const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Import ticket routes
const ticketRoutes = require('./routes/ticketRoutes');
app.use('/api/tickets', ticketRoutes);

// Start the server
const port = process.env.PORT || 5002;
app.listen(port, () => {
    console.log(`Ticket service running on port ${port}`);
});
