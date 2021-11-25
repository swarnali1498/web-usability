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
    },
    mouse_coods: {
        URL: {
            type: String
        },
        mouse_coords: [{
            X: {
                type: Number
            },
            Y: {
                type: Number
            }
        }]
    }
});


/* 

    URL + task_id + clicks

*/

module.exports = mongoose.model("Task", task_schema);
