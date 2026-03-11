const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MOONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
    console.log('Database connection attempted');   
}


module.exports = connectDB;