const express = require('express');
const usercontroller = require('../controllers/user');

const router = express.Router();

router.post('/signup', usercontroller.signup);

module.exports = router; // Corrected export statement
