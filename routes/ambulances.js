// routes/ambulances.js
const express = require('express');
const router = express.Router();
const Ambulance = require('../models/Ambulance');
const { ensureAuth, ensureRole } = require('../config/auth');

// Get all ambulance locations (public or admin)
router.get('/', async (req, res) => {
    try {
        const ambulances = await Ambulance.find();
        res.json(ambulances);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update ambulance location (admin or ambulance driver)
router.put('/:id/location', ensureAuth, async (req, res) => {
    try {
        const ambulance = await Ambulance.findById(req.params.id);
        if (!ambulance) return res.status(404).json({ message: 'Ambulance not found' });
        // Only admin or the driver (assuming driverName stored in session role) can update
        if (req.session.role !== 'admin' && req.session.role !== 'driver') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const { lng, lat } = req.body;
        ambulance.location.coordinates = [lng, lat];
        await ambulance.save();
        res.json(ambulance);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
