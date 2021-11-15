// Task schema
const { model } = require('mongoose');
const mongoose = require('mongoose');

const task_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    URL: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Task", task_schema);
