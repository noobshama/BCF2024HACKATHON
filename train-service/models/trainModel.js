const pool = require('../config/db');

// Fetch all trains
const getTrains = async () => {
    const result = await pool.query('SELECT * FROM trains');
    return result.rows;
};

// Fetch train schedule by train ID
const getTrainSchedule = async (trainId) => {
    const result = await pool.query(
        `SELECT ts.*, s.name AS station_name, s.location 
         FROM train_schedules ts 
         JOIN stations s ON ts.station_id = s.id 
         WHERE ts.train_id = $1`,
        [trainId]
    );
    return result.rows;
};

module.exports = {
    getTrains,
    getTrainSchedule,
};
