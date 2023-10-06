const Sequelize = require('sequelize');

const sequelize = new Sequelize('groupchat', 'root', '12345678', {
    dialect: 'mysql',
    host: 'localhost', // or your database host
});

module.exports = sequelize;
