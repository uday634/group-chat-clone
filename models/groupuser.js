const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const groupuser = sequelize.define('groupuser', {
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    groupId: Sequelize.INTEGER,
    userId: Sequelize.INTEGER,  
});

module.exports = groupuser;