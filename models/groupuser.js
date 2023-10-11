const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const groupuser = sequelize.define('groupuser', {
    groupId: Sequelize.INTEGER,
    userId: Sequelize.INTEGER,  
});

module.exports = groupuser;