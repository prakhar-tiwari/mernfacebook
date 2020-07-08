const express = require('express');
const { body, oneOf } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/auth/auth');

router.post('/signup',
    [
        body('firstName', 'First name must be minimum 3 characters')
            .trim()
            .isLength({ min: 3 }),
        body('lastName', 'Last Name must be minimum 3 characters')
            .trim()
            .isLength({ min: 3 }),
        oneOf([
            body('contactInfo')
                .isNumeric()
                .isLength({ min: 10, max: 10 }),
            body('contactInfo')
                .isEmail()
        ], 'Must be 10 digit contact number or email'),
        body('password', 'Password must be minimum 6 characters')
            .trim()
            .isLength({ min: 6 })
    ],
    authController.signup);

router.post('/login',
    [
        oneOf([
            body('contactInfo')
                .isNumeric()
                .isLength({ min: 10, max: 10 }),
            body('contactInfo')
                .isEmail()
        ], 'Must be 10 digit contact number or email'),
        body('password', 'Password must be minimum 6 characters')
            .trim()
            .isLength({ min: 6 })
    ],
    authController.login);

module.exports = router;