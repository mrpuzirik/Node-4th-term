const { Game, Team, Result, User } = require('../model');

class SportRepository {

  async getGames() {
    try {
      const games = await Game.findAll({
        include: [
          { model: Team, as: 'team1', attributes: ['name'] },
          { model: Team, as: 'team2', attributes: ['name'] },
          { model: Result, attributes: ['score'] }
        ]
      });
      return games;
    } catch (error) {
      throw new Error('Помилка при отриманні ігор з бази даних: ' + error.message);
    }
  }

  async getAllTeams() {
    try {
      const teams = await Team.findAll();
      return teams;
    } catch (error) {
      throw new Error('Помилка при отриманні команд: ' + error.message);
    }
  }

  async addGame(date, team1Id, team2Id) {
    try {
      const team1 = await Team.findByPk(team1Id);
      const team2 = await Team.findByPk(team2Id);

      if (!team1 || !team2) {
        throw new Error('Одна або обидві команди не знайдені');
      }

      const newGame = await Game.create({ date, team1_id: team1Id, team2_id: team2Id });
      return newGame.id;  // Повертаємо ID нової гри
    } catch (error) {
      throw new Error('Помилка при додаванні гри: ' + error.message);
    }
  }

  async addResult(gameId, score) {
    try {
      const result = await Result.create({ game_id: gameId, score });
      return result.id;
    } catch (error) {
      throw new Error('Помилка при додаванні результату: ' + error.message);
    }
  }

  async updateGameResult(gameId, score) {
    try {
      const result = await Result.findOne({ where: { game_id: gameId } });
      if (!result) {
        throw new Error('Результат для цієї гри не знайдений');
      }

      await result.update({ score });
    } catch (error) {
      throw new Error('Помилка при оновленні результату: ' + error.message);
    }
  }


  async deleteGame(gameId) {
    try {
      const game = await Game.findByPk(gameId);
      if (!game) {
        throw new Error('Гра не знайдена');
      }

      await Game.destroy({ where: { id: gameId } });
    } catch (error) {
      throw new Error('Помилка при видаленні гри: ' + error.message);
    }
  }

  async deleteResult(gameId) {
      const result = await Result.findOne({ where: { game_id: gameId } });
      if (result) {
        await Result.destroy({ where: { game_id: gameId } });
      }


  }

  async addTeam(teamName) {
    try {
      const newTeam = await Team.create({ name: teamName });
      return newTeam.id;
    } catch (error) {
      throw new Error('Помилка при додаванні команди: ' + error.message);
    }
  }

  async deleteTeam(teamId) {
    try {
      await Team.destroy({ where: { id: teamId } });
    } catch (error) {
      throw new Error('Помилка при видаленні команди: ' + error.message);
    }
  }

  async getUserByUsername(username) {
    try {
      const user = await User.findOne({ where: { username } });
      return user;
    } catch (error) {
      throw new Error('Помилка при отриманні користувача: ' + error.message);
    }
  }

}

module.exports = new SportRepository();