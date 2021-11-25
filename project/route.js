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
        const projects = await Project.find();
        console.log(projects);
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:project_id/info', verify_token, async (req, res) => {
    try {
        const project_id = req.params.project_id;
        const project = await Project.findOne({
            __id: project_id
        });

        res.json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', verify_token, async (req, res) => {
    try {
        const project = new Project({
            name: req.body.name,
            description: req.body.description,
            organisation: req.body.organisation,
            URL: req.body.URL
        });

        const new_proj = await project.save();
        res.status(200).json(new_proj);
    } catch (err) {
        console.log(req.body);
        res.status(500).json({ error: err.message });
    }
});

router.get('/tasks/:project_id', verify_token, async (req, res) => {
    try {
        const project_id = req.params.project_id;
        const project = await Project.findOne({
            __id: project_id
        });
        res.status(200).json({ data: project["tasks"] });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/task/:project_id', verify_token, async (req, res) => {
    try {
        const project_id = req.params.project_id;
        const task_id = req.body.task_id;
        const projects = await Project.findOne({
            __id: project_id
        });
        projects["tasks"].push(task_id);
        projects.save();
        res.status(200).json({ message: "successfully added new task" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router
