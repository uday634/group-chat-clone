const messagedata = require('../models/messagedata')


exports.storemessage =async (req, res, next) => {
    const message = req.body.message
    const userId = req.user.id
    try{
        const messageData = await messagedata.create({
            message: message,
            userId: userId
        }) 
        console.log(messageData)
    }catch(err){
        console.log(err)
        res.status(401).json({message: 'cant store the message', err: err})
    }
    
}