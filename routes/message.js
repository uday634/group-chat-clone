const express = require('express');
const messagecontroller = require('../controllers/message');
const authenticate = require('../middleware/auth')
const Messagedata = require('../models/messagedata')
const User = require('../models/users')
const GroupUser = require('../models/groupuser');

const router = express.Router();

router.get('/groups',authenticate.authenticate,messagecontroller.groups)

router.post('/group',authenticate.authenticate, messagecontroller.group)
router.post('/joingroup',authenticate.authenticate, messagecontroller.joingroup)


router.post('/message',authenticate.authenticate,messagecontroller.message)
router.get('/:id',authenticate.authenticate, async(req, res, next) => {
    try{
        const messages = await Messagedata.findAll({where : {groupId: req.params.id}})
        res.status(200).json(messages)
    }catch(err){
        console.log(err);
        res.status(401).json({message: 'cant fetch messages', error: err})
    }
})

router.delete('/:deleteId',authenticate.authenticate, async(req, res, next) =>{
    console.log('uday kumar'+req.params.deleteId)
    try{
        const deletedmessage = await Messagedata.destroy({where: {id: req.params.deleteId}})
        console.log(deletedmessage)
    }catch(err){
        res.status(401).json({message: 'cant delete the message', error: err})
    }
})


module.exports = router