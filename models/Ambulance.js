// models/Ambulance.js
const mongoose = require('mongoose');

const ambulanceSchema = new mongoose.Schema({
    driverName: { type: String, required: true },
    vehicleNumber: { type: String, required: true },
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], default: [0, 0] } // [lng, lat]
    },
    status: { type: String, enum: ['available', 'on-duty', 'offline'], default: 'available' },
}, { timestamps: true });

ambulanceSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Ambulance', ambulanceSchema);
