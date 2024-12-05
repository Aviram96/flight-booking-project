const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    flight: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
    customerName: { type: String, required: true },
    bookingDate: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
