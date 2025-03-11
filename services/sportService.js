const fs = require('fs').promises;
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
    const data = await fs.readFile('./data/testData.json', 'utf8');
    const json = JSON.parse(data);

    const newGame = {
      id: json.games.length ? json.games[json.games.length - 1].id + 1 : 1,
      date,
      participants
    };

    json.games.push(newGame);
    await fs.writeFile('./data/testData.json', JSON.stringify(json, null, 2));

    console.log(`Додано гру: ${date}, ${participants}`);
  }

  async addResult(gameId, score) {
    const data = await fs.readFile('./data/testData.json', 'utf8');
    const json = JSON.parse(data);

    const resultIndex = json.results.findIndex(r => r.gameId === gameId);
    if (resultIndex !== -1) {
      json.results[resultIndex].score = score;
    } else {
      json.results.push({ gameId, score });
    }

    await fs.writeFile('./data/testData.json', JSON.stringify(json, null, 2));

    console.log(`Оновлено результат гри ${gameId}: ${score}`);
  }

  async updateGameDate(gameId, newDate) {
    const data = await fs.readFile('./data/testData.json', 'utf8');
    const json = JSON.parse(data);

    const game = json.games.find(g => g.id === gameId);
    if (game) {
      game.date = newDate;
      await fs.writeFile('./data/testData.json', JSON.stringify(json, null, 2));
      console.log(`Дата гри ${gameId} змінена на ${newDate}`);
    }
  }

  async deleteGame(gameId) {
    const data = await fs.readFile('./data/testData.json', 'utf8');
    const json = JSON.parse(data);

    json.games = json.games.filter(g => g.id !== gameId);
    json.results = json.results.filter(r => r.gameId !== gameId);

    await fs.writeFile('./data/testData.json', JSON.stringify(json, null, 2));

    console.log(`Гру ${gameId} видалено`);
  }
}

module.exports = new SportService();
