const express = require('express');
const usercontroller = require('../controllers/user');

const router = express.Router();

router.post('/users', usercontroller.users);
router.post('/login', usercontroller.login)

module.exports = router; // Corrected export statement
