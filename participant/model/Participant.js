// participant schema
const { model } = require('mongoose');
const mongoose = require('mongoose');

const participant_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Participant", participant_schema);
