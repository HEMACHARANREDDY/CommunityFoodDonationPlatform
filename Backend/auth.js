const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Make sure this path is correct
const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
    const { name, mobile, password, role } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ mobile });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ name, mobile, password: hashedPassword, role });
        await newUser.save();

        // Create JWT token
        const token = jwt.sign({ id: newUser._id }, 'secretKey', { expiresIn: '1h' });

        res.status(201).json({ message: 'Signup successful', token });

    } catch (error) {
        console.error('Signup error:', error);  // Log the error to the console
        res.status(500).json({ message: 'Server error during signup', error: error.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { mobile, password } = req.body;

    try {
        const user = await User.findOne({ mobile });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        console.error('Login error:', error);  // Log the error to the console
        res.status(500).json({ message: 'Server error during login', error: error.message });
    }
});

module.exports = router;