const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();

const {
    DB_URL,
    PORT = 3000
} = process.env;

mongoose.connect(DB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log('connected to db')
);

app.use(express.json());

const route_participant = require('./participant/route');
const route_observer = require('./observer/route');
const route_project = require('./project/route');
const route_task = require('./task/route');
const route_test = require('./test/route');
const route_calendar = require('./calendar/route');
const route_page = require('./page_mouse/route');
// const route_video = require('./video/route');

app.use('/participant', route_participant);
app.use('/observer', route_observer);
app.use('/project', route_project);
app.use('/task', route_task);
app.use('/test', route_test);
app.use('/calendar', route_calendar);
app.use('/page', route_page);
// app.use('/video', route_video);
app.use(express.static('public'));
app.use(express.static('video'));

app.listen(PORT, () => {
    console.log("running server");
});
