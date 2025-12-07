// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Register new user (patient or doctor based on role)
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existing = await User.findOne({ email });
        if (existing) return res.status(409).json({ message: 'User already exists' });
        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashed, role });
        await user.save();
        req.session.userId = user._id;
        req.session.role = role;
        res.status(201).json({ message: 'User registered', userId: user._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: 'Invalid credentials' });
        req.session.userId = user._id;
        req.session.role = user.role;
        res.json({ message: 'Logged in', role: user.role });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Logout
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ message: 'Logout failed' });
        res.clearCookie('connect.sid');
        res.json({ message: 'Logged out' });
    });
});

// Get current logged‑in user info
router.get('/user', (req, res) => {
    if (req.session && req.session.userId) {
        User.findById(req.session.userId)
            .select('name email role')
            .then(user => {
                if (!user) return res.status(404).json({ message: 'User not found' });
                res.json({ userId: user._id, name: user.name, email: user.email, role: user.role });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ message: 'Server error' });
            });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

module.exports = router;
