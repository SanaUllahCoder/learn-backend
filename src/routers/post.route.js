const express = require('express');
const router = express.Router();

router.post('/create', (req, res) => {
    console.log('Create post route accessed', req.body);
    cosole.log('Cookies:', req.cookies);

    res.send('Post created successfully');  
});
