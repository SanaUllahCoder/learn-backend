const express = require('express');
const authControllers = require('../controllers/auth.controller');
const registerValidator = require('../middlewares/auth.validator');

const router = express.Router();

router.post('/register', registerValidator.registerValidationRules, authControllers.registerUser);
router.post('/login', authControllers.loginUser);

module.exports = router;