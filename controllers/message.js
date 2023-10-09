const messagedata = require('../models/messagedata')
const User = require('../models/signup')
const Sequelize = require('sequelize')


exports.storemessage =async (req, res, next) => {
    const message = req.body.message
    const userId = req.user.id
    const name = req.user.name
    console.log(name)
    try{
        const messageData = await messagedata.create({
            name: name,
            message: message,
            userId: userId
        }) 
        console.log(messageData)
    }catch(err){
        console.log(err)
        res.status(401).json({message: 'cant store the message', err: err})
    }
    
}

exports.sendmessage = async (req, res, next) => {
    try {
        console.log(req.user.id);
        
        // Get the latestMessageId from the query parameters (if provided)
        const latestMessageId = req.query.latestMessageId || null;

        // Modify the findAll query to filter messages with IDs greater than the latestMessageId
        const messages = await messagedata.findAll({
            where: {
                id: {
                    [Sequelize.Op.gt]: latestMessageId,
                },
            },
        });

        const user = await User.findOne({ where: { id: req.user.id } });

        // Create an object containing both the user ID and messages
        const responseData = {
            userId: req.user.id,
            name: user.name,
            messages: messages,
        };

        // Send the object as a JSON response
        res.status(200).json(responseData);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Unable to fetch messages', error: err });
    }
};


