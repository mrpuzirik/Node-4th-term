const express = require('express');
const sportService = require('../services/sportService');
const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/schedule');
});

router.get('/schedule', async (req, res) => {
  const games = await sportService.getSchedule();
  res.render('schedule', { games });
});

router.get('/search', async (req, res) => {
  const team = req.query.team;
  const games = await sportService.searchByTeam(team);
  res.render('search', { games, team });
});

router.get('/admin/game/new', (req, res) => {
  res.render('schedule', { games: [] });
});

router.post('/admin/game', async (req, res) => {
  const { date, team1, team2 } = req.body;
  await sportService.addGame(date, [team1, team2]);
  res.redirect('/schedule');
});

router.post('/admin/result', async (req, res) => {
  const { gameId, score } = req.body;
  await sportService.addResult(gameId, score);
  res.redirect('/schedule');
});

module.exports = router;