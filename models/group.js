const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const group = sequelize.define('group', {
    groupId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdby: Sequelize.INTEGER,

});

module.exports = group;