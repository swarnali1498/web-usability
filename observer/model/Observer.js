// participant schema
const { model } = require('mongoose');
const mongoose = require('mongoose');

const observer_schema = new mongoose.Schema({
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
    }
});

module.exports = mongoose.model("Observer", observer_schema);
