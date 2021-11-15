// Test schema
const { model } = require('mongoose');
const mongoose = require('mongoose');

const test_schema = new mongoose.Schema({
    project_id: {
        type: String,
        required: true
    },
    task_id: {
        type: String,
        required: true
    },
    participant_id: {
        type: String,
        required: true
    },
    sched_time: {
        type: Date,
    },
    start_time: {
        type: Date
    },
    end_time: {
        type: Date
    },
    mouse_coords: [{
        X: {
            type: Number,
            required: true
        },
        Y: {
            type: Number,
            required: true
        }
    }],
    video_URL: {
        type: String
    }
});

module.exports = mongoose.model("Test", test_schema);
