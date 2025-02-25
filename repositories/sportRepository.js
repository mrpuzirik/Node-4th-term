const fs = require('fs');
const fsPromises = require('fs').promises;

class SportRepository {
  getGamesSync() {
    const data = fs.readFileSync('./data/testData.json', 'utf8');
    const parsedData = JSON.parse(data);
    return this.mergeGamesWithResults(parsedData.games, parsedData.results);
  }

  getGamesCallback(callback) {
    fs.readFile('./data/testData.json', 'utf8', (err, data) => {
      if (err) return callback(err);
      const parsedData = JSON.parse(data);
      callback(null, this.mergeGamesWithResults(parsedData.games, parsedData.results));
    });
  }

  getGamesPromise() {
    return fsPromises.readFile('./data/testData.json', 'utf8')
      .then(data => {
        const parsedData = JSON.parse(data);
        return this.mergeGamesWithResults(parsedData.games, parsedData.results);
      });
  }

  async getGames() {
    const data = await fsPromises.readFile('./data/testData.json', 'utf8');
    const parsedData = JSON.parse(data);
    return this.mergeGamesWithResults(parsedData.games, parsedData.results);
  }

  mergeGamesWithResults(games, results) {
    return games.map(game => {
      const result = results.find(r => r.gameId === game.id);
      return { ...game, score: result ? result.score : 'Немає результату' };
    });
  }
}

module.exports = new SportRepository();