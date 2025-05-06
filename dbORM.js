const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './data/sports.db',
    logging: false, 
});

module.exports = sequelize;