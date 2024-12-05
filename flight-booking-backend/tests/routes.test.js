const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Flight = require('../models/fight');


describe('API Routes Tests', () => {
    beforeAll(async () => {
        jest.spyOn(console, 'log').mockImplementation(() => { }); // מניעת console.log

        const mongoURI = 'mongodb://localhost:27017/flightBooking';
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

        // יצירת טיסה לדוגמה
        await Flight.create({
            departure: 'Tel Aviv',
            destination: 'London',
            date: new Date('2024-12-25'),
            price: 300,
        });
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
        jest.restoreAllMocks(); // שיחזור console.log
    });

    it('should fetch all flights', async () => {
        const res = await request(app).get('/api/flights');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeGreaterThan(0); // לוודא שיש טיסה אחת לפחות
    });

    it('should fetch all bookings', async () => {
        const res = await request(app).get('/api/bookings');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should create a new booking', async () => {
        const flight = await Flight.findOne(); // השג טיסה קיימת
        const bookingData = {
            flight: flight._id, // ID של טיסה קיימת
            customerName: 'Test User',
        };

        const res = await request(app).post('/api/bookings').send(bookingData);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.customerName).toEqual(bookingData.customerName);
    });
});
