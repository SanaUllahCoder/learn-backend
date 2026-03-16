const mongoose = require('mongoose');


async function connectDB() {
    try {
    await mongoose.connect('mongodb+srv://learn-database:Frc6clxt0anS57dy@learn-backend.ryynacy.mongodb.net/spotify-clone' )
    console.log('Connected to MongoDB');  
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }  
}  

module.exports = connectDB ;