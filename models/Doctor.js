// models/Doctor.js
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    specialization: { type: String, required: true },
    bio: { type: String },
    availability: [{
        day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
        slots: [{ start: String, end: String }]
    }]
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
