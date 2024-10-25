-- Create trains table
CREATE TABLE trains (
    id SERIAL PRIMARY KEY,                 
    name VARCHAR(100) NOT NULL,            
    route VARCHAR(100) NOT NULL,           
    capacity INT NOT NULL,                
    UNIQUE (name)                         
);

-- Create stations table
CREATE TABLE stations (
    id SERIAL PRIMARY KEY,                 -- Unique identifier for each station
    name VARCHAR(100) NOT NULL,            -- Station name (e.g., "City A Central")
    location VARCHAR(100) NOT NULL,        -- Station location (e.g., "City A, Main St")
    UNIQUE (name)                          -- Ensure station names are unique
);

-- Create train_schedules table
CREATE TABLE train_schedules (
    id SERIAL PRIMARY KEY,                 -- Unique identifier for each schedule
    train_id INT NOT NULL,                 -- Foreign key to the trains table
    station_id INT NOT NULL,               -- Foreign key to the stations table
    arrival_time TIMESTAMP NOT NULL,       -- Scheduled arrival time
    departure_time TIMESTAMP NOT NULL,     -- Scheduled departure time
    FOREIGN KEY (train_id) REFERENCES trains(id) ON DELETE CASCADE,   -- Cascade on delete
    FOREIGN KEY (station_id) REFERENCES stations(id) ON DELETE CASCADE -- Cascade on delete
);

-- Indexes for optimizing queries on foreign keys in train_schedules table
CREATE INDEX idx_train_id ON train_schedules (train_id);   -- Index on train_id for faster lookups
CREATE INDEX idx_station_id ON train_schedules (station_id); -- Index on station_id for faster lookups


-- Inserting some train records
INSERT INTO trains (name, route, capacity)
VALUES
('Express 101', 'City A - City B', 200),
('Express 102', 'City B - City C', 250),
('Express 103', 'City A - City C', 180);
-- Inserting some station records
INSERT INTO stations (name, location)
VALUES
('City A Central', 'City A, Main St'),
('City B Junction', 'City B, Elm St'),
('City C Terminal', 'City C, Oak St');
-- Inserting schedule records for Express 101 (City A to City B)
INSERT INTO train_schedules (train_id, station_id, arrival_time, departure_time)
VALUES
(1, 1, '2024-10-25 09:00:00', '2024-10-25 09:15:00'), -- Arrival at City A Central
(1, 2, '2024-10-25 11:00:00', '2024-10-25 11:15:00'); -- Arrival at City B Junction

-- Inserting schedule records for Express 102 (City B to City C)
INSERT INTO train_schedules (train_id, station_id, arrival_time, departure_time)
VALUES
(2, 2, '2024-10-26 10:00:00', '2024-10-26 10:15:00'), -- Arrival at City B Junction
(2, 3, '2024-10-26 12:30:00', '2024-10-26 12:45:00'); -- Arrival at City C Terminal

-- Inserting schedule records for Express 103 (City A to City C)
INSERT INTO train_schedules (train_id, station_id, arrival_time, departure_time)
VALUES
(3, 1, '2024-10-27 08:00:00', '2024-10-27 08:15:00'), -- Arrival at City A Central
(3, 3, '2024-10-27 10:30:00', '2024-10-27 10:45:00'); -- Arrival at City C Terminal
