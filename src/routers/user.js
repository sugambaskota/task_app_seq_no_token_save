const express = require('express');
const User = require('../models/user');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = await user.generateAuthToken();
        res.status(201).json({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.json({ user, token });
    } catch (e) {
        res.status(400).send();
    }
});

router.get('/users/profile', auth, async (req, res) => {
    const user = req.user;
    res.status(200).json(user);
});

router.delete('/users/remove', auth, async (req, res) => {
    const user = req.user;
    await user.destroy();
    res.status(202).send();
});

router.patch('/users/update', auth, async (req, res) => {
    const user = req.user;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }
    const result = await user.update(req.body);
    res.status(202).json(result);
});


module.exports = router;