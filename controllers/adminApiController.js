const express = require('express');
const sportService = require('../services/sportService');
const router = express.Router();

router.use((req, res, next) => {
    if (!req.session.user) return res.status(401).json({ error: 'Неавторизований доступ' });
    next();
});

// GET /api/games?team=TeamName&page=1&limit=5
router.get('/games', async (req, res) => {
    try {
        const { team, page = 1, limit = 10 } = req.query;
        const allGames = team ? await sportService.searchByTeam(team) : await sportService.getSchedule();

        const startIndex = (parseInt(page) - 1) * parseInt(limit);
        const paginatedGames = allGames.slice(startIndex, startIndex + parseInt(limit));

        res.status(200).json({
            total: allGames.length,
            page: parseInt(page),
            limit: parseInt(limit),
            data: paginatedGames
        });
    } catch (err) {
        res.status(500).json({ error: 'Помилка при отриманні розкладу' });
    }
});

router.get('/teams', async (req, res) => {
    try {
        const teams = await sportService.getTeams();
        res.status(200).json(teams);
    } catch (err) {
        res.status(500).json({ error: 'Помилка при отриманні команд' });
    }
});

router.post('/games', async (req, res) => {
    const { date, team1, team2 } = req.body;
    if (team1 === team2) {
        return res.status(400).json({ error: 'Команда не може грати сама проти себе' });
    }

    try {
        const team1HasMatch = await sportService.hasMatchOnDate(team1, date);
        const team2HasMatch = await sportService.hasMatchOnDate(team2, date);

        if (team1HasMatch || team2HasMatch) {
            return res.status(400).json({ error: 'Одна з команд вже має матч в цей день' });
        }

        await sportService.addGame(date, [team1, team2]);
        res.status(201).json({ message: 'Гру успішно додано' });
    } catch (err) {
        const status = err.statusCode || 500;
        res.status(status).json({ error: err.message });
    }
});

router.put('/games/:id/score', async (req, res) => {
    const gameId = parseInt(req.params.id);
    const { score } = req.body;

    if (!/^\d+:\d+$/.test(score) && score !== "Немає результату") {
        return res.status(400).json({ error: 'Невірний формат рахунку' });
    }

    try {
        if (score !== "Немає результату") {
            await sportService.updateGameResult(gameId, score);
        }
        res.status(200).json({ message: 'Результат оновлено' });
    } catch (err) {
        res.status(500).json({ error: 'Помилка при оновленні результату' });
    }
});

router.put('/games/:id/date', async (req, res) => {
    const gameId = parseInt(req.params.id);
    const { date } = req.body;

    try {
        await sportService.updateGameDate(gameId, date);
        res.status(200).json({ message: 'Дату гри оновлено' });
    } catch (err) {
        res.status(500).json({ error: 'Помилка при оновленні дати' });
    }
});

router.delete('/games/:id', async (req, res) => {
    const gameId = parseInt(req.params.id);
    try {
        await sportService.deleteGame(gameId);
        res.status(200).json({ message: 'Гру успішно видалено' });
    } catch (err) {
        res.status(500).json({ error: 'Помилка при видаленні гри' });
    }
});

router.post('/teams', async (req, res) => {
    const { teamName } = req.body;
    try {
        await sportService.addTeam(teamName);
        res.status(201).json({ message: 'Команду додано' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/teams/:id', async (req, res) => {
    const teamId = parseInt(req.params.id);
    try {
        await sportService.deleteTeam(teamId);
        res.status(200).json({ message: 'Команду видалено' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;