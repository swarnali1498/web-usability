// participant schema
const { model } = require('mongoose');
const mongoose = require('mongoose');

const participant_schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    projects: [{
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    }],
    tasks: [{
        project_id: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    }],
    tests: [{
        id: {
            type: String,
            required: true
        }
    }]
    // tests_sched: [{
    //     test_id: {
    //         type: String,
    //         required: true
    //     }
    // }],
});

module.exports = mongoose.model("Participant", participant_schema);
