const express = require('express');
const messagecontroller = require('../controllers/message');
const authenticate = require('../middleware/auth')
const Messagedata = require('../models/messagedata')
const User = require('../models/users')

const router = express.Router();

router.post('/messagedata',authenticate.authenticate, messagecontroller.storemessage)
router.get('/fetchmessage', authenticate.authenticate, messagecontroller.sendmessage)
router.post('/group',authenticate.authenticate, messagecontroller.group)
router.get('/groups',authenticate.authenticate, messagecontroller.groups)
router.get('/:id',authenticate.authenticate, async (req, res, next)=>{
    const messages = await Messagedata.findAll({where : {groupId: req.params.id}})
    res.json({messages,userId: req.user.id})
})
router.post('/sendgroupmessage',authenticate.authenticate, async(req, res, next)=>{
    console.log(req.body)
    const message = req.body.message
    const userId = req.user.id
    const name = req.user.name
    const groupId = req.body.groupId
    console.log('ddddddddddddddddddddddddddddddddd', groupId)
    try{
        const messagedata = await Messagedata.create({
            name : name,
            message: message,
            userId: userId,
            groupId: groupId
        }) 
    }catch(err){
        console.log(err)
    }


})


module.exports = router