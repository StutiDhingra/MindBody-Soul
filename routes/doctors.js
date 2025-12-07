// routes/doctors.js
const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const { ensureAuth, ensureRole } = require('../config/auth');

// Get all doctors (public)
router.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.find().populate('user', 'name email specialization');
        res.json(doctors);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a doctor profile (admin only)
router.post('/', ensureAuth, ensureRole('admin'), async (req, res) => {
    try {
        const { userId, specialization, bio, availability } = req.body;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        const doctor = new Doctor({ user: userId, specialization, bio, availability });
        await doctor.save();
        res.status(201).json(doctor);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update doctor profile (admin or the doctor themselves)
router.put('/:id', ensureAuth, async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id).populate('user');
        if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
        if (req.session.role !== 'admin' && String(doctor.user._id) !== req.session.userId) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const updates = req.body;
        Object.assign(doctor, updates);
        await doctor.save();
        res.json(doctor);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
