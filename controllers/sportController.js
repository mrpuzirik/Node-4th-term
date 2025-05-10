const express = require('express');
const sportService = require('../services/sportService');
const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/schedule');
});

router.get('/schedule', async (req, res) => {
  try {
    const games = await sportService.getSchedule();

    if (!Array.isArray(games)) {
      return res.status(500).send('Помилка в отриманні даних для розкладу');
    }

    res.render('schedule', { games });
  } catch (error) {
    res.status(500).send('Помилка в отриманні даних для розкладу: ' + error.message);
  }
});

router.get('/search', async (req, res) => {
  const team = req.query.team;

  if (!team) {
    return res.status(400).send('Будь ласка, введіть назву команди');
  }

  try {
    const games = await sportService.searchByTeam(team);
    res.render('search', { games, team });
  } catch (error) {
    res.status(500).send('Помилка при пошуку ігор за командою: ' + error.message);
  }
});

module.exports = router;
