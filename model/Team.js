const { DataTypes } = require('sequelize');
const sequelize = require('../dbORM');

const Team = sequelize.define('Team', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    tableName: 'teams',
    timestamps: false,
});

module.exports = Team;
