const router = require('express').Router();
const Participant = require('./model/Participant');
// rend details about a participant
router.get('/', async (req, res) => {
    try {
        const participants = await Participant.find();
        res.json(participants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const participant = new Participant({
            name: req.body.name,
            password: req.body.password
        });
        const new_part = await participant.save();
        res.status(201).json(new_part);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const participants = await Participant.find({
            name: req.body.name
        });
        if (participants.length != 1) {
            res.status(400).json({ error: "auth err 1" });
        }
        else if (participants[0]["password"] != req.body.password) {
            console.log(participants[0]);
            console.log(req.body.password);

            res.status(400).json({ error: "auth err 2" });
        }
        else {
            res.status(200).json({ message: "valid participant" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router
