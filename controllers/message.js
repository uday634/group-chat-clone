const Messagedata = require('../models/messagedata')
const Group = require('../models/group')
const GroupUser = require('../models/groupuser')
const User = require('../models/users')
const Sequelize = require('sequelize')


exports.group= async(req, res, next) => {
    try{
        // const user = await User.findOne({where: {id: req.user.userId}})
        const group = await Group.create({
            name : req.body.groupName,
            createdby : req.user.id
        }) 
        const groupuser = await GroupUser.create({
            groupId: group.groupId,
            userId: req.user.id
        });
    }catch(err){
        console.log(err)
        res.status(401).json({message: 'data not reseived', err: err})
    }
}

exports.groups = async(req, res, next)=> {
    try{
        const user = req.user
        const groups = await Group.findAll()
        res.status(200).json({groups,user})
    }catch(err){
        res.status(401).json({message: 'something went wrong while feating groups', error: err})
    }
}

exports.joingroup = async(req, res, next) => {
    try{
        const groupUser = await  GroupUser.create({
            groupId:req.body.groupId,
            userId: req.user.id
        })
    }catch(err){
        console.log(err)
    }
}

exports.message = async (req, res, next)=> {
    console.log(req.user.name)
    try{
        const message = await Messagedata.create({
            name: req.user.name,
            message:req.body.message,
            userId: req.user.id,
            groupId: req.body.groupId
        });       
    }catch(err){
        console.log(err);
        res.status(401).json({message: 'cant store the message', error: err})
    }
}


