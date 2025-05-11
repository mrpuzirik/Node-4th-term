const express = require('express');
const sportService = require('../services/sportService');
const router = express.Router();

// GET /api/schedule
router.get('/schedule', async (req, res) => {
    try {
        const games = await sportService.getSchedule();

        if (!Array.isArray(games)) {
            return res.status(500).json({ error: 'Помилка в отриманні розкладу' });
        }

        res.status(200).json(games);
    } catch (err) {
        res.status(500).json({ error: 'Помилка при завантаженні розкладу' });
    }
});

// GET /api/search?team=TeamName
router.get('/search', async (req, res) => {
    const team = req.query.team;

    if (!team) {
        return res.status(400).json({ error: 'Необхідно вказати назву команди' });
    }

    try {
        const games = await sportService.searchByTeam(team);
        res.status(200).json(games);
    } catch (err) {
        res.status(500).json({ error: 'Помилка при пошуку ігор за командою' });
    }
});

module.exports = router;
