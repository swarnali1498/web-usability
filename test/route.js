const router = require('express').Router();
const verify_token = require('../middleware/verify_token');
const Test = require('./model/Test');
const Participant = require('../participant/model/Participant');
const Project = require('../project/model/Project');
const Task = require('../task/model/Task');

const JWT = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const {
    JWT_SECRET = 'secret ;P'
} = process.env;


router.get('/', verify_token, async (req, res) => {
    try {
        const tests = await Test.find();
        console.log(tests);
        res.status(200).json(tests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/:test_id', verify_token, async (req, res) => {
    try {
        const test = await Test.findOne({
            _id: req.params.test_id
        });
        res.status(200).json(test);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:project_id/:task_id', verify_token, async (req, res) => {
    try {
        const project_id = req.params.project_id;
        const task_id = req.params.task_id;
        const tests = await Test.find({
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
        res.status(200).json({ data: test_list });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/* 

POST /test/create

{
    observer_id: req.body.observer_id,
    participant_id: req.body.participant_id,
    project_id: req.body.project_id,
    task_id: req.body.task_id,
    sched_time: req.body.sched_time
}    


*/
router.post('/create', verify_token, async (req, res) => {
    try {
        const test = new Test({
            observer_id: req._id,
            participant_email: req.body.participant_email,
            project_id: req.body.project_id,
            task_id: req.body.task_id,
            sched_time: req.body.sched_time
        });

        const new_test = await test.save();

        const part = await Participant.findOne({
            email: req.body.participant_email,
        });

        const proj = await Project.findOne({
            _id: req.body.project_id
        });

        const task = await Task.findOne({
            _id: req.body.task_id
        });

        part.projects.push(
            {
                id: req.body.project_id,
                name: proj.name,
            }
        );
        part.tests.push(
            {
                id: test._id
            }
        );
        part.tasks.push(
            {
                project_id: req.body.project_id,
                id: req.body.task_id,
                name: task.name
            }
        );
        await part.save();

        console.log("Test created");
        console.log(new_test);
        res.status(200).json(new_test);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// router.post('/start/:id', verify_token, async (req, res) => {
//     try {
//         const test = await Test.findOne({
//             _id: req.params.id
//         });
//         test.start_time = new Date();
//         await test.save();
//         res.status(200).json({ message: "Started the test" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

router.post('/end/:id', verify_token, async (req, res) => {
    try {
        const test = await Test.findOne({
            _id: req.params.id
        });
        test.start_time = req.body.start_time;
        test.end_time = req.body.start_time;

        const task = await Task.findOne({
            _id: test.task_id
        });

        task.mouse_coords.push({
            URL: req.body.URL,
            mouse_coords: req.body.mouse_coords
        });

        await test.save();
        await task.save();

        console.log(test);
        console.log(task);

        res.status(200).json({ message: "Ended the test, updated the data" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// router.post('/mouse_coords/:id', verify_token, async (req, res) => {
//     try {
//         const test = await Test.findOne({
//             _id: req.params.id
//         });
//         test.mouse_coords = req.body.mouse_coords;
//         await test.save();
//         res.status(200).json({ message: "Added mouse co-ordinated to the test" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

router.post('/video_url/:id', verify_token, async (req, res) => {
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

/*  

POST test/remark/{task_id}

{
    remark: "jsdhfkjhasjdfkhksjdf"
}
*/

router.post('/remark/:id', verify_token, async (req, res) => {
    try {
        const test = await Test.findOne({
            _id: req.params.id
        });
        test.remark = req.body.remark;
        await test.save();
        res.status(200).json({ message: "Added remark to the test" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router
