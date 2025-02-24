const fs = require('fs');
const fsPromises = require('fs').promises;

class SportRepository {
  getGamesSync() {
    const data = fs.readFileSync('./data/testData.json', 'utf8');
    return JSON.parse(data).games;
  }

  getGamesCallback(callback) {
    fs.readFile('./data/testData.json', 'utf8', (err, data) => {
      if (err) return callback(err);
      callback(null, JSON.parse(data).games);
    });
  }

  getGamesPromise() {
    return fsPromises.readFile('./data/testData.json', 'utf8')
      .then(data => JSON.parse(data).games);
  }

  async getGames() {
    const data = await fsPromises.readFile('./data/testData.json', 'utf8');
    return JSON.parse(data).games;
  }
}

module.exports = new SportRepository();