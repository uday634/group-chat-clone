const bcrypt = require('bcrypt');
const User = require('../models/signup'); // Import your User model

exports.signup = async (req, res, next) => {
    try {
        const { name, email, phoneNumber, password } = req.body; 
        const hashPassword = await bcrypt.hash(password, 10);
        const existingUser = await User.findOne({where: {email: email}})
        if(!existingUser){
            const user = await User.create({
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                password: hashPassword, 
            });
            console.log(user)
            res.status(201).json({ message: 'Signup  is successful' });
        }else{
            res.status(201).json({message: 'user already exist'})
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
};
