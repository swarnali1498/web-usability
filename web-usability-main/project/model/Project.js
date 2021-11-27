// Project schema
const { model } = require('mongoose');
const mongoose = require('mongoose');

const project_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    organisation: {
        type: String,
        required: true
    },
    URL: {
        type: String,
        required: true
    },
    tasks: [{
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    }],
});

module.exports = mongoose.model("Project", project_schema);
