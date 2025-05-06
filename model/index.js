const sequelize = require('../dbORM');
const Team = require('./Team');
const Game = require('./Game');
const Result = require('./Result');
const User = require('./User');


Game.belongsTo(Team, { as: 'team1', foreignKey: 'team1_id' });
Game.belongsTo(Team, { as: 'team2', foreignKey: 'team2_id' });
Game.hasOne(Result, { foreignKey: 'game_id' });
Result.belongsTo(Game, { foreignKey: 'game_id' });


module.exports = {
    sequelize,
    Team,
    Game,
    Result,
    User
};