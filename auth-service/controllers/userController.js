const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Controller for user registration
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    // Check if the user or email already exists
    const userExists = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]);
    if (userExists.rows.length > 0) {
        return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash the password and insert the new user into the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
        [username, email, hashedPassword]
    );

    const user = result.rows[0];
    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    res.json({ accessToken: token });
};

// Controller for user login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists by email
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = userResult.rows[0];

    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    res.json({ accessToken: token });
};

// Controller for fetching user profile
exports.getProfile = async (req, res) => {
    const { id } = req.user;

    const userResult = await pool.query('SELECT id, username, email FROM users WHERE id = $1', [id]);
    const user = userResult.rows[0];

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
};
