const express = require('express');
const Booking = require('../models/Booking');
const Flight = require('../models/Flight');

const router = express.Router();

// GET: כל ההזמנות עם קשר לטיסות
router.get('/', async (req, res) => {
    try {
        // שימוש ב-find של Mongoose במקום findAll של Sequelize
        const bookings = await Booking.find().populate('flight');
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
});


// POST: יצירת הזמנה חדשה
router.post('/', async (req, res) => {
    try {
        const { flight, customerName } = req.body;

        if (!flight || !customerName) {
            return res.status(400).json({ error: 'Missing required fields: flight and customerName are mandatory' });
        }

        const flightExists = await Flight.findById(flight); // שימוש ב-findById של mongoose
        if (!flightExists) {
            return res.status(404).json({ error: 'Flight not found' });
        }

        const newBooking = new Booking({
            flight,
            customerName,
        });
        await newBooking.save(); // שמירה למסד הנתונים

        // מחזיר את ההזמנה עם פרטי הטיסה
        const populatedBooking = await newBooking.populate('flight');
        res.status(201).json(populatedBooking);
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Failed to create booking' });
    }
});


// DELETE: מחיקת הזמנה לפי ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // חיפוש הזמנה לפי ID
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        // מחיקת הזמנה
        await Booking.findByIdAndDelete(id);
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({ error: 'Failed to delete booking' });
    }
});

module.exports = router;
