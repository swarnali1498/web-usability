const router = require('express').Router();
const verify_token = require('../middleware/verify_token');
const Test = require('./model/Test');

const JWT = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const {
    JWT_SECRET = 'secret ;P'
} = process.env;

router.get('/:project_id/:task_id', verify_token, async (req, res) => {
    try {
        const project_id = req.params.project_id;
        const task_id = req.params.task_id;
        const tests = await Test.findOne({
            project_id: project_id,
            task_id: task_id
        });
        res.status(200).json(tests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/participant/:project_id/', verify_token, async (req, res) => {
    try {
        const project_id = req.params.project_id;
        const part_id = req.__id;
        const tests = await Test.find({
            project_id: project_id,
            participant_id: part_id
        });
        test_list = [];
        for (let test in tests) {
            test_list.push(test["task_id"])
        }
        res.json({ data: test_list });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/create', verify_token, async (req, res) => {
    try {
        const test = new Test({
            observer_id: req.body.observer_id,
            participant_id: req.body.participant_id,
            project_id: req.body.project_id,
            task_id: req.body.task_id,
            sched_time: req.body.sched_time
        });

        const new_test = await test.save();
        res.status(200).json(new_test);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/start/:id', verify_token, async (req, res) => {
    try {
        const test = await Test.findOne({
            _id: req.params.id
        });
        test.start_time = new Date();
        await test.save();
        res.status(200).json({ message: "Started the test" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/end/:id', verify_token, async (req, res) => {
    try {
        const test = await Test.findOne({
            _id: req.params.id
        });
        test.end_time = new Date();
        await test.save();
        res.status(200).json({ message: "Ended the test" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/mouse_coords/:id', verify_token, async (req, res) => {
    try {
        const test = await Test.findOne({
            _id: req.params.id
        });
        test.mouse_coords = req.body.mouse_coords;
        await test.save();
        res.status(200).json({ message: "Added mouse co-ordinated to the test" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/video_url/:id', verify_token, async (req, res) => {
    try {
        const test = await Test.findOne({
            _id: req.params.id
        });
        test.video_url = req.body.video_url;
        await test.save();
        res.status(200).json({ message: "Added video URL to the test" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router
