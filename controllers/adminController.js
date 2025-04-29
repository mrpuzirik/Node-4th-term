const express = require('express');
const sportService = require('../services/sportService');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const games = await sportService.getSchedule();
        const teams = await sportService.getTeams();
        const error = req.query.error || null;
        res.render('admin', { games, teams, error });
    } catch (err) {
        res.status(500).send('Помилка при завантаженні адмін-панелі');
    }
});

router.post('/game', async (req, res) => {
    const { date, team1, team2 } = req.body;

    if (team1 === team2) {
        return res.redirect(`/admin?error=${encodeURIComponent('Команда не може грати сама проти себе!')}`);
    }

    try {
        const team1HasMatch = await sportService.hasMatchOnDate(team1, date);
        const team2HasMatch = await sportService.hasMatchOnDate(team2, date);

        if (team1HasMatch) {
            return res.redirect(`/admin?error=${encodeURIComponent(`${team1} вже має матч в цей день!`)}`);
        }

        if (team2HasMatch) {
            return res.redirect(`/admin?error=${encodeURIComponent(`${team2} вже має матч в цей день!`)}`);
        }

        await sportService.addGame(date, [team1, team2]);
        res.redirect('/admin');
    } catch (err) {
        res.redirect(`/admin?error=${encodeURIComponent(err.message)}`);
    }
});

router.post('/update-game', async (req, res) => {
    const { gameId, score } = req.body;

    if (!/^\d+:\d+$/.test(score) && score !== "Немає результату") {
        return res.redirect(`/admin?error=${encodeURIComponent('Невірний формат рахунку! Введіть у форматі "число:число" або "Немає результату".')}`);
    }

    try {
        if (score !== "Немає результату") {
             await sportService.updateGameResult(parseInt(gameId), score);
        }
        res.redirect('/admin');
    } catch (error) {
        res.redirect(`/admin?error=${encodeURIComponent('Помилка при оновленні результату гри')}`);
    }
});

router.post('/update-date', async (req, res) => {
    const { gameId, date } = req.body;
    try {
        await sportService.updateGameDate(parseInt(gameId), date);
        res.redirect('/admin');
    } catch (error) {
        res.redirect(`/admin?error=${encodeURIComponent('Помилка при оновленні дати')}`);
    }
});

router.post('/delete', async (req, res) => {
    const { gameId } = req.body;
    try {
        await sportService.deleteGame(parseInt(gameId));
        res.redirect('/admin');
    } catch (error) {
        res.redirect(`/admin?error=${encodeURIComponent('Помилка при видаленні гри')}`);
    }
});

router.post('/team', async (req, res) => {
    const { teamName } = req.body;

    try {
        await sportService.addTeam(teamName);
        res.redirect('/admin'); // редирект на адмін-панель
    } catch (err) {
        res.redirect(`/admin?error=${encodeURIComponent(err.message)}`);
    }
});

router.post('/delete-team', async (req, res) => {
    const { teamId } = req.body;

    try {
        await sportService.deleteTeam(parseInt(teamId));
        res.redirect('/admin');
    } catch (err) {
        res.redirect(`/admin?error=${encodeURIComponent(err.message)}`);
    }
});

module.exports = router;
