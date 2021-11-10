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

app.use('/participant', route_participant);

app.listen(PORT, () => {
    console.log("running server");
});
