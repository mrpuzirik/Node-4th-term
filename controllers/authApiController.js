const express = require('express');
const sportService = require('../services/sportService');
const router = express.Router();



// POST /api/login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    console.log(req.body)
    try {
        const user = await sportService.login(username, password);
        req.session.user = user;
        res.status(200).json({ message: 'Вхід виконано успішно', user });
    } catch (err) {
        res.status(401).json({ error: 'Невірне імʼя користувача або пароль' });
    }
});

// POST /api/logout
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ error: 'Помилка при виході' });
        res.status(200).json({ message: 'Сесію завершено' });
    });
});

module.exports = router;
