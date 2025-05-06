const { DataTypes } = require('sequelize');
const sequelize = require('../dbORM.js');
const Team = require('./Team');

const Game = sequelize.define('Game', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'games',
    timestamps: false,
});

module.exports = Game;
