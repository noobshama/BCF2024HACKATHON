const trainModel = require('../models/trainModel');

// Get all trains (No caching)
const getTrains = async () => {
    // Directly fetch trains from the database
    return await trainModel.getTrains();
};

// Get the schedule for a specific train by its ID
const getTrainSchedule = async (trainId) => {
    return await trainModel.getTrainSchedule(trainId);
};

module.exports = {
    getTrains,
    getTrainSchedule,
};
