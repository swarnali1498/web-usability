// Page schema
const { model } = require('mongoose');
const mongoose = require('mongoose');

const page_schema = new mongoose.Schema({
    URL: {
        type: String,
        required: true
    },
    mouse_coords: [
        {
            type: Number
        }
    ]

});

module.exports = mongoose.model("Page", page_schema);
