const routers = require('../routers/auth.route');

const jwt = require('jsonwebtoken');
const Note = require('../models/user.model');



async function register(req, res) {
    const { username, password, email } = req.body;
    // Here you would typically add logic to save the user to the database

    const existingUser = await Note.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });   
    }

    const user = await Note.create({ username, password, email });

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET);


    res.cookie('token', token)

    res.status(201).json({
        message: 'User registered successfully',
        user
    });

}


module.exports = { register };