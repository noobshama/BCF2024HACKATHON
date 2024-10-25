-- Create bookings table
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    train_id INT NOT NULL,
    user_id INT NOT NULL,
    seat_number INT NOT NULL,
    booking_time TIMESTAMP NOT NULL DEFAULT NOW(),
    payment_status BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (train_id) REFERENCES trains(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE (train_id, seat_number)
);
