const express = require('express');
const sportService = require('../services/sportService');
const router = express.Router();

router.get('/', async (req, res) => {
  const games = await sportService.getSchedule();
  res.render('admin', { games });
});

router.post('/game', async (req, res) => {
  const { date, team1, team2 } = req.body;
  await sportService.addGame(date, [team1, team2]);
  res.redirect('/admin');
});

router.post('/update-game', async (req, res) => {
    const { gameId, score } = req.body;

    if (!/^\d+:\d+$/.test(score) && score !== "Немає результату") {
        console.log('Помилка: результат гри повинен бути у форматі "число:число" або "Немає результату".');
        return res.redirect(`/admin?error=${encodeURIComponent('Невірний формат рахунку! Введіть у форматі "число:число" або "Немає результату".')}`);
    }

    try {
        //await sportService.addResult(parseInt(gameId), score);
        console.log(`Оновлено результат гри ${gameId}: ${score}`);
        res.redirect('/admin');
    } catch (error) {
        console.error('Помилка при оновленні результату:', error);
        res.redirect(`/admin?error=Внутрішня помилка сервера`);
    }
});

router.post('/update-date', async (req, res) => {
  const { gameId, date } = req.body;
  await sportService.updateGameDate(parseInt(gameId), date);
  res.redirect('/admin');
});

router.post('/delete', async (req, res) => {
  const { gameId } = req.body;
  await sportService.deleteGame(parseInt(gameId));
  res.redirect('/admin');
});

module.exports = router;
