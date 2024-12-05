require('dotenv').config();
const mongoose = require('mongoose');
const Flight = require('./models/Flight');

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/flightBooking';

mongoose.connect(mongoURI);

const seedFlights = async () => {
    try {
        await Flight.deleteMany({});
        await Flight.insertMany([
            {
                departure: 'Tel Aviv',
                destination: 'New York',
                date: new Date('2024-12-31'),
                price: 500,
            },
            {
                departure: 'London',
                destination: 'Paris',
                date: new Date('2024-12-20'),
                price: 300,
            },
        ]);

        console.log('Data seeded successfully!');
        mongoose.connection.close();
    } catch (err) {
        console.error('Error seeding data:', err);
        mongoose.connection.close();
    }
};

seedFlights();
