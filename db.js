const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/sports.db');

/*const data = {
    teams: [
        "Динамо", "Шахтар", "Олександрія", "Карпати", "Кривбас"
    ],
    games: [
        { id: 2, date: "2025-03-01", participants: ["Полісся", "Шахтар"] },
        { id: 3, date: "2024-12-14", participants: ["Олександрія", "ЛНЗ"] },
        { id: 4, date: "2024-12-14", participants: ["Кривбас", "Карпати"] },
        { id: 5, date: "2024-12-14", participants: ["Зоря", "Чорноморець"] }
    ],
    results: [
        { gameId: 2, score: "5:1" },
        { gameId: 3, score: "6:0" },
        { gameId: 4, score: "3:2" }
    ]
};

db.serialize(() => {
    // Створення таблиць
    db.run(`CREATE TABLE IF NOT EXISTS teams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
  )`);

    db.run(`CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY,
    date TEXT NOT NULL,
    team1_id INTEGER,
    team2_id INTEGER,
    FOREIGN KEY(team1_id) REFERENCES teams(id),
    FOREIGN KEY(team2_id) REFERENCES teams(id)
  )`);

    db.run(`CREATE TABLE IF NOT EXISTS results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id INTEGER UNIQUE,
    score TEXT NOT NULL,
    FOREIGN KEY(game_id) REFERENCES games(id)
  )`);

    // Вставка команд (з усіх джерел)
    const allTeamNames = new Set([
        ...data.teams,
        ...data.games.flatMap(g => g.participants)
    ]);

    const insertTeam = db.prepare(`INSERT OR IGNORE INTO teams (name) VALUES (?)`);
    for (const name of allTeamNames) {
        insertTeam.run(name);
    }
    insertTeam.finalize();

    // Вставка ігор
    const getTeamId = (name, cb) => {
        db.get(`SELECT id FROM teams WHERE name = ?`, [name], (err, row) => {
            cb(err, row ? row.id : null);
        });
    };

    const insertGame = db.prepare(`INSERT OR IGNORE INTO games (id, date, team1_id, team2_id) VALUES (?, ?, ?, ?)`);
    data.games.forEach(game => {
        getTeamId(game.participants[0], (err1, id1) => {
            getTeamId(game.participants[1], (err2, id2) => {
                if (!err1 && !err2) {
                    insertGame.run(game.id, game.date, id1, id2);
                }
            });
        });
    });
    insertGame.finalize();

    // Вставка результатів
    const insertResult = db.prepare(`INSERT OR IGNORE INTO results (game_id, score) VALUES (?, ?)`);
    data.results.forEach(res => {
        insertResult.run(res.gameId, res.score);
    });
    insertResult.finalize();
});

module.exports = db;*/

// Дані про ігри
/*const data = {
    games: [
        { id: 2, date: "2025-03-01", participants: ["Полісся", "Шахтар"] },
        { id: 3, date: "2024-12-14", participants: ["Олександрія", "ЛНЗ"] },
        { id: 4, date: "2024-12-14", participants: ["Кривбас", "Карпати"] },
        { id: 5, date: "2024-12-14", participants: ["Зоря", "Чорноморець"] }
    ]
};

// Функція для отримання ID команди
const getTeamId = (name, cb) => {
    db.get(`SELECT id FROM teams WHERE name = ?`, [name], (err, row) => {
        if (err) {
            console.error(`Помилка при отриманні ID для команди ${name}:`, err.message);
            cb(err, null);
        } else if (row) {
            cb(null, row.id);
        } else {
            console.error(`Команда ${name} не знайдена в БД.`);
            cb(new Error(`Команда ${name} не знайдена`), null);
        }
    });
};

// Вставка ігор з перевіркою ID команд
data.games.forEach(game => {
    const [team1, team2] = game.participants;

    getTeamId(team1, (err1, id1) => {
        if (err1 || !id1) return;

        getTeamId(team2, (err2, id2) => {
            if (err2 || !id2) return;

            db.run(`INSERT OR IGNORE INTO games (id, date, team1_id, team2_id) VALUES (?, ?, ?, ?)`,
                [game.id, game.date, id1, id2], (err) => {
                    if (err) {
                        console.error(`Помилка при вставці гри ${game.id}:`, err.message);
                    } else {
                        console.log(`Гра ${game.id} вставлена успішно: ${team1} vs ${team2}`);
                    }
                });
        });
    });
});*/


