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
    participant_email: {
        type: String,
        required: true
    },
    observer_id: {
        type: String,
        required: true
    },
    sched_time: {
        type: Date,
        required: true
    },
    start_time: {
        type: Date
    },
    end_time: {
        type: Date
    },
    video_url: {
        type: String
    },
    remark: {
        type: String
    }
});

module.exports = mongoose.model("Test", test_schema);
