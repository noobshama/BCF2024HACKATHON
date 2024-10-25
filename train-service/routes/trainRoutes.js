const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainController');

// Route to get all trains
router.get('/trains', trainController.getAllTrains);

// Route to get the schedule of a specific train by its ID
router.get('/trains/:id/schedule', trainController.getTrainSchedule);

module.exports = router;
