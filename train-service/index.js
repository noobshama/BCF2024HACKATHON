const express = require('express');
const cors = require('cors');  // Import CORS
const trainRoutes = require('./routes/trainRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS middleware
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api', trainRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
