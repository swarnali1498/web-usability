const router = require('express').Router();
const verify_token = require('../middleware/verify_token');
const Test = require('./model/Test');

const JWT = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const {
    JWT_SECRET = 'secret ;P'
} = process.env;

router.get('/', verify_token, async (req, res) => {
    try {
        const id = req.__id;
        const tests = await Test.findOne({
            __id: id
        });
        res.json(tests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', verify_token, async (req, res) => {
    try {
        const test = new Test({
            name: req.body.name,
            description: req.body.description,
            URL: req.body.URL
        });

        const new_test = await test.save();
        res.status(200).json(new_test);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router
