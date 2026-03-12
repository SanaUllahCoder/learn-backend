const express = require('express');
const jwt = require('jsonwebtoken');
const controllers = require('../controllers/auth.controllers');
const Note = require('../models/user.model');
const router = express.Router();

router.post('/create', async (req, res) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decode =  jwt.verify(token, process.env.JWT_SECRET);
        console.log('Authenticated user:', decode);
        const userId = await Note.findOne({
            _id: decode.id
        });
        console.log('Authenticated user ID:', userId);
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    res.send('Post created successfully');
});

module.exports = router;