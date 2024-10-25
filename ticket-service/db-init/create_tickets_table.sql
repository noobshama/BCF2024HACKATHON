-- Create tickets table
CREATE TABLE tickets (
    id SERIAL PRIMARY KEY, 
    train_id INT NOT NULL, 
    user_id INT NOT NULL, 
    seat_number INT NOT NULL, 
    booking_time TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (train_id) REFERENCES trains(id) ON DELETE CASCADE, 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE (train_id, seat_number)  -- Ensure no two bookings for the same seat
);

-- Create index to speed up seat queries
CREATE INDEX idx_train_seat ON tickets (train_id, seat_number);
