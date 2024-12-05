const express = require('express');
const { Flight, Booking } = require('../models'); // ייבוא של המודלים
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const flights = await Flight.find(); +
            res.status(200).json(flights);
    } catch (error) {
        console.error('Error fetching flights:', error.message);
        res.status(500).json({ error: error.message });
    }
});


// POST יצירת טיסה חדשה
router.post('/', async (req, res) => {
    try {
        const flight = new Flight(req.body); // יצירת מופע חדש
        await flight.save(); // שמירה למסד הנתונים
        res.json(flight);
    } catch (error) {
        console.error('Error creating flight:', error);
        res.status(500).json({ error: error.message });
    }
});

// DELETE מחיקת טיסה לפי מזהה
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const flight = await Flight.findByIdAndDelete(id); // מחיקה לפי מזהה
        if (!flight) {
            return res.status(404).json({ message: `Flight with id ${id} not found.` });
        }
        res.json({ message: `Flight with id ${id} deleted successfully.` });
    } catch (error) {
        console.error('Error deleting flight:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
