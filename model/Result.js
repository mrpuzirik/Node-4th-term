const { DataTypes } = require('sequelize');
const sequelize = require('../dbORM');
const Game = require('./Game');

const Result = sequelize.define('Result', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    game_id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
    },
    score: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'results',
    timestamps: false,
});

module.exports = Result;
