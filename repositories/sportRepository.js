const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/sports.db');

class SportRepository {

  getGames() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT games.id, games.date, t1.name AS team1, t2.name AS team2, results.score
              FROM games
              JOIN teams t1 ON games.team1_id = t1.id
              JOIN teams t2 ON games.team2_id = t2.id
              LEFT JOIN results ON games.id = results.game_id`, (err, rows) => {
        if (err) {
          return reject('Помилка при отриманні ігор з бази даних: ' + err);
        }
        resolve(rows);
      });
    });
  }

  getAllTeams() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM teams', (err, rows) => {
        if (err) {
          return reject('Помилка при отриманні команд: ' + err);
        }
        resolve(rows);
      });
    });
  }

  addGame(date, team1Id, team2Id) {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO games (date, team1_id, team2_id) VALUES (?, ?, ?)', [date, team1Id, team2Id], function(err) {
        if (err) {
          return reject('Помилка при додаванні гри: ' + err);
        }
        resolve(this.lastID);  // Повертаємо ID нової гри
      });
    });
  }

  addResult(gameId, score) {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO results (game_id, score) VALUES (?, ?)', [gameId, score], function(err) {
        if (err) {
          return reject('Помилка при додаванні результату: ' + err);
        }
        resolve(this.lastID);
      });
    });
  }

  updateGameResult(gameId, score) {
    return new Promise((resolve, reject) => {
      db.run('UPDATE results SET score = ? WHERE game_id = ?', [score, gameId], function(err) {
        if (err) {
          return reject('Помилка при оновленні результату: ' + err);
        }
        resolve();
      });
    });
  }

  updateGameDate(gameId, newDate) {
    return new Promise((resolve, reject) => {
      db.run('UPDATE games SET date = ? WHERE id = ?', [newDate, gameId], function(err) {
        if (err) {
          return reject('Помилка при оновленні дати гри: ' + err);
        }
        resolve();
      });
    });
  }

  deleteGame(gameId) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM games WHERE id = ?', [gameId], function(err) {
        if (err) {
          return reject('Помилка при видаленні гри: ' + err);
        }
        resolve();
      });
    });
  }

  deleteResult(gameId) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM results WHERE game_id = ?', [gameId], function(err) {
        if (err) {
          return reject('Помилка при видаленні результату: ' + err);
        }
        resolve();
      });
    });
  }

  addTeam(teamName) {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO teams (name) VALUES (?)', [teamName], function(err) {
        if (err) {
          return reject('Помилка при додаванні команди: ' + err);
        }
        resolve();
      });
    });
  }

  deleteTeam(teamId) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM teams WHERE id = ?', [teamId], function(err) {
        if (err) {
          return reject('Помилка при видаленні команди: ' + err);
        }
        resolve();
      });
    });
  }

  getUserByUsername(username) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }

}

module.exports = new SportRepository();
