// models/Appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'canceled'], default: 'pending' },
    notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
