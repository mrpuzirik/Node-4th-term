const sportRepository = require('../repositories/sportRepository');

class SportService {
  async getSchedule() {
    return sportRepository.getGames();
  }

  async searchByTeam(team) {
    if (!team) return [];
    const games = await sportRepository.getGames();
    return games.filter(game => game.participants.includes(team));
  }

  async addGame(date, participants) {
    console.log(`Додано гру: ${date}, ${participants}`);
  }

  async addResult(gameId, score) {
    console.log(`Додано результат для гри ${gameId}: ${score}`);
  }
}

module.exports = new SportService();