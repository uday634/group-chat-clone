const express = require('express');
const messagecontroller = require('../controllers/message');
const authenticate = require('../middleware/auth')
const Messagedata = require('../models/messagedata')
const User = require('../models/users')
const GroupUser = require('../models/groupuser');
const Group = require('../models/group');


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

router.delete('/group/:groupId', authenticate.authenticate, async (req, res, next) => {
    try {
        const deletedGroup = await Group.destroy({ where: { id: req.params.groupId } });
        console.log(deletedGroup);
        res.status(204).end();
    } catch (err) {
        res.status(401).json({ message: 'cant delete the group', error: err });
    }
});

router.delete('/message/:deleteId', authenticate.authenticate, async (req, res, next) => {
    try {
        const deletedMessage = await Messagedata.destroy({ where: { id: req.params.deleteId } });
        console.log(deletedMessage);
        res.status(204).end();
    } catch (err) {
        res.status(401).json({ message: 'cant delete the message', error: err });
    }
});

// Delete a group





module.exports = router