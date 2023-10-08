const express = require('express');
const messagecontroller = require('../controllers/message');
const authenticate = require('../middleware/auth')

const router = express.Router();

router.post('/messagedata',authenticate.authenticate, messagecontroller.storemessage)
router.get('/fetchmessage', authenticate.authenticate, messagecontroller.sendmessage)

module.exports = router