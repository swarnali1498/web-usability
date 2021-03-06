const router = require('express').Router();
const verify_token = require('../middleware/verify_token');
const Participant = require('./model/Participant');
// const Test = require('../test/model/Test');

const JWT = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const {
    JWT_SECRET = 'secret ;P'
} = process.env;

// send details about a participant
router.get('/', verify_token, async (req, res) => {
    try {
        const id = req.__id;
        const participants = await Participant.findOne({
            __id: id
        });
        res.json(participants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/project', verify_token, async (req, res) => {
    try {
        const id = req._id;
        const participant = await Participant.find({
            _id: id
        });
        console.log(participant[0]);
        res.status(200).json([participant[0]["projects"]]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/project/:project_id/tasks', verify_token, async (req, res) => {
    try {
        const id = req._id;

        const participants = await Participant.find({
            _id: id
        });
        console.log("sending tasks");
        console.log(participants[0]["tasks"]);
        res.status(200).json({ data: participants[0]["tasks"] });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/login', async (req, res) => {
    try {
        const participants = await Participant.find({
            email: req.body.email
        });
        if (participants.length != 1) {
            res.status(400).json({ message: "auth err 1" });
        }
        else if (participants[0]["password"] != req.body.password) {
            console.log(participants[0]);
            console.log(req.body.password);

            res.status(400).json({ message: "auth err 2" });
        }
        else {
            const data = {
                _id: participants[0]["_id"],
                email: req.body.email,
                name: participants[0]["name"]
            };
            const token = JWT.sign(data, JWT_SECRET);
            res.status(200).json({ message: "valid participant", sessionID: token });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/register', async (req, res) => {
    try {
        const participants = await Participant.find({
            email: req.body.email
        });
        if (participants.length != 0) {
            res.status(400).json({ message: "auth err 1" });
        }
        else {
            const participant = new Participant({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name,
                age: req.body.age,
                gender: req.body.gender
            });

            const new_part = await participant.save();
            res.status(200).json(new_part);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router
