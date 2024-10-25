-- SQL to create users table with email
CREATE TABLE  users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,  -- Email field with unique constraint
    password VARCHAR(255) NOT NULL
);
