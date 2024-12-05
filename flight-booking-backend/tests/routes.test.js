const request = require('supertest');
const app = require('../server'); // נניח שהאפליקציה שלך מיוצאת מהקובץ server.js

describe('API Routes Tests', () => {
    it('should fetch all flights', async () => {
        const res = await request(app).get('/api/flights');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should fetch all bookings', async () => {
        const res = await request(app).get('/api/bookings');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should create a new booking', async () => {
        const bookingData = {
            flightId: 1,
            customerName: 'Test User',
            customerEmail: 'test.user@example.com',
        };

        const res = await request(app).post('/api/bookings').send(bookingData);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.customerName).toEqual(bookingData.customerName);
    });
});
