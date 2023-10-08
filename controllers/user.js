const bcrypt = require('bcrypt');
const User = require('../models/signup');
const jws = require('jsonwebtoken')  // Import your User model


function generateToken(id){
    return jws.sign({userId: id}, 'secreatekey')
} 
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


exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            const token = generateToken(user.id);
            res.status(200).json({ message: 'Login successful', token: token });
        } else {
            return res.status(401).json({ message: 'Incorrect password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};