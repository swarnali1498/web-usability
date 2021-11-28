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
    mouse_coords: {
        URL: {
            mouse_coords: [{
                type: Number
            }]
        }
    }
});

// [
//     {URL:"serc.com/index.html", mouse_coods: [{1, 2}, {1, 3}]},
//     {URL:"serc.com/people.html", mouse_coods: [{1, 2}, {1, 3}]},
//     {URL:"serc.com/faculty.html", mouse_coods: [{1, 2}, {1, 3}]}    
// ]

/* 

    URL + task_id + clicks

    test[mouse_coords][url] = array

*/

module.exports = mongoose.model("Task", task_schema);
