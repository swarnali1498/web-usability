const router = require('express').Router();
const Observer = require('./model/Observer');
// rend details about a participant
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const observers = await Observer.findOne({
            __id: id
        });
        res.json(observers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {

        const check_observer = await Observer.find({
            email: req.body.email
        });

        if (check_observer.length != 0) {
            res.status(400).json({ error: "User already exists" });
            return;
        }

        const observer = new Observer({
            name: req.body.email,
            password: req.body.password
        });
        const new_obs = await participant.save();
        res.status(201).json(new_obs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const observers = await Observer.find({
            name: req.body.name
        });
        if (observers.length != 1) {
            res.status(400).json({ error: "auth err 1" });
        }
        else if (observers[0]["password"] != req.body.password) {
            console.log(observers[0]);
            console.log(req.body.password);

            res.status(400).json({ error: "auth err 2" });
        }
        else {
            res.status(200).json({ message: "valid observer" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router
