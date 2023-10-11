const jwt = require('jsonwebtoken');
const User = require('../models/users');

exports.authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        console.log(token)

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const key = 'secreatekey'; // Replace with your actual secret key
        const user = jwt.verify(token, key);
        console.log('happy user ' ,   user)

        // Now that you have the user ID from the token, you can fetch the user
        const currentUser = await User.findByPk(user.userId);

        if (!currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Attach the user object to the request for future use
        req.user = currentUser;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
