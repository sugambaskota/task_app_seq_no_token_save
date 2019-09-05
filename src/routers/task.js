const express = require('express');
const Task = require('../models/task');
const User = require('../models/user');
const auth = require('../middleware/auth')
const router = express.Router();


router.post('/tasks', auth, async (req, res) => {
    try {
        const task = await Task.create({
            description: req.body.description,
            completed: req.body.completed,
            userId: req.user.id
        });
        res.status(201).json(task);
    } catch (e) {
        res.status(400).send(e)
    }
});

router.get('/tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.findAll({
            where: {
                userId: req.user.id
            }
        });
        res.status(200).json(tasks);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOne({
            where: {
                id: _id
            }
        });
        if (!task) {
            return res.status(404).send();
        }
        res.status(200).json(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOne({
            where: {
                id: _id
            }
        });
        if (!task) {
            return res.status(404).send();
        }
        await task.destroy();
        res.status(202).send();
    } catch (e) {
        res.status(500).send(e);
    }
});

router.patch('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).json({ error: 'Invalid updates!' });
    }
    try {
        const task = await Task.findOne({
            where: {
                id: _id
            }
        });
        if (!task) {
            return res.sendStatus(404).send();
        }
        const result = await task.save(req.body);
        res.status(202).json(result);
    } catch (e) {
        res.status(400).send(e);
    }
});

Task.belongsTo(User);

module.exports = router;