const router = require('express').Router();
const verify_token = require('../middleware/verify_token');
const Observer = require('./model/Observer');

const JWT = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const {
    JWT_SECRET = 'secret ;P'
} = process.env;

// send details about a observer
router.get('/', verify_token, async (req, res) => {
    try {
        const id = req.__id;
        const observers = await Observer.findOne({
            __id: id
        });
        res.json(observers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const observers = await Observer.find({
            email: req.body.email
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
            const data = {
                id: observers[0]["__id"],
                email: observers[0]["email"],
                name: observers[0]["name"]
            };
            const token = JWT.sign(data, JWT_SECRET);
            res.status(200).json({ message: "valid participant", token: token });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/register', async (req, res) => {
    try {
        const observers = await Observer.find({
            email: req.body.email
        });
        if (observers.length != 0) {
            res.status(400).json({ error: "auth err 1" });
        }
        else {
            const observer = new Observer({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name,
                age: req.body.age,
                gender: req.body.gender
            });

            const new_part = await observer.save();
            res.status(200).json(new_part);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router