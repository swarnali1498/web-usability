const router = require('express').Router();
const verify_token = require('../middleware/verify_token');
const Task = require('./model/Task');

const JWT = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const {
    JWT_SECRET = 'secret ;P'
} = process.env;

router.get('/:task_id', verify_token, async (req, res) => {
    try {
        const id = req.params.task_id;
        const tasks = await Task.findOne({
            _id: id
        });
        // const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', verify_token, async (req, res) => {
    try {
        const task = new Task({
            name: req.body.name,
            description: req.body.description,
            URL: req.body.URL
        });

        const new_task = await task.save();
        res.status(200).json(new_task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router
