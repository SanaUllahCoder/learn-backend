const mongoose = require('mongoose');

async function connectDB() {
    await mongoose.connect('mongodb+srv://learn-database:Frc6clxt0anS57dy@learn-backend.ryynacy.mongodb.net/projectone')
    console.log('Connected to MongoDB');
}

module.exports = connectDB;
