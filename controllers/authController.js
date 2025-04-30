const express = require('express');
const router = express.Router();
const sportService = require('../services/sportService');

router.get('/', (req, res) => {
    res.render('login', { error: null });
});

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await sportService.login(username, password);
        req.session.user = user;
        res.redirect('/admin');
    } catch (err) {
        res.render('login', { error: err.message });
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
