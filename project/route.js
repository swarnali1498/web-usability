const router = require('express').Router();
const verify_token = require('../middleware/verify_token');
const Project = require('./model/Project');

const JWT = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const {
    JWT_SECRET = 'secret ;P'
} = process.env;

router.get('/', verify_token, async (req, res) => {
    try {
        const id = req.__id;
        const projects = await Project.findOne({
            __id: id
        });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', verify_token, async (req, res) => {
    try {
        const project = new Project({
            name: req.body.name,
            description: req.body.description,
            URL: req.body.URL,
            tests: req.body.tests
        });

        const new_proj = await project.save();
        res.status(200).json(new_proj);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router
