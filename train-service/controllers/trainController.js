const trainService = require('../services/trainService');

// Get all trains
exports.getAllTrains = async (req, res) => {
    try {
        const trains = await trainService.getTrains();
        res.json(trains);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get train schedule by train ID
exports.getTrainSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const schedule = await trainService.getTrainSchedule(id);
        if (!schedule.length) {
            return res.status(404).json({ msg: 'No schedule found for this train' });
        }
        res.json(schedule);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
