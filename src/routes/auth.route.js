const express = require('express');
const router = express.Router();

const authControllers = require('../controllers/auth.controllers');


router.post('/register', authControllers.register);

router.get('/login', (req, res) => {
    console.log('Login route accessed', req.cookies);

    res.json({
        message: 'Login route accessed',
        cookies: req.cookies  
    })

});

module.exports = router;