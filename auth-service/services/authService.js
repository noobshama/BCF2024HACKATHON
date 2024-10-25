const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Hash a password
exports.hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

// Compare a password with a hash
exports.comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

// Generate a JWT token
exports.generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
