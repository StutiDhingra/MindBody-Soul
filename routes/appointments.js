// routes/appointments.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const { ensureAuth, ensureRole } = require('../config/auth');

// Get appointments for logged-in user (patient view)
router.get('/my', ensureAuth, async (req, res) => {
    try {
        const appointments = await Appointment.find({ patient: req.session.userId })
            .populate('doctor')
            .populate('patient', 'name email');
        res.json(appointments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Admin can view all appointments
router.get('/', ensureAuth, ensureRole('admin'), async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate('doctor')
            .populate('patient', 'name email');
        res.json(appointments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new appointment (patient)
router.post('/', ensureAuth, ensureRole('patient'), async (req, res) => {
    try {
        const { doctorId, date, notes } = req.body;
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
        const appointment = new Appointment({
            patient: req.session.userId,
            doctor: doctorId,
            date,
            notes,
        });
        await appointment.save();
        res.status(201).json(appointment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update appointment status (admin or patient who owns it)
router.put('/:id', ensureAuth, async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
        if (
            req.session.role !== 'admin' &&
            String(appointment.patient) !== req.session.userId
        ) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        Object.assign(appointment, req.body);
        await appointment.save();
        res.json(appointment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
