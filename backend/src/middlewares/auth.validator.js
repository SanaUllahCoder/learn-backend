const { body, validationResult } = require('express-validator');

async function validateRegister(req, res, next) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
}

const registerValidationRules = [

    body('username')
        .notEmpty()
        .withMessage("Username is required")
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters long"),

    body('email')
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format"),

    body('password')
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),


    validateRegister
];


async function validateLogin(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    
    }
    next()
}

const loginValidationRules = [
    body('username')
        .notEmpty()
        .withMessage("Username or email is required"),
    body('password')
        .notEmpty()
        .withMessage("Password is required"),
    validateLogin
]


module.exports = { registerValidationRules, loginValidationRules };
