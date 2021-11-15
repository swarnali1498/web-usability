const router = require('express').Router();
const verify_token = require('../middleware/verify_token');
const { google } = require('googleapis');

const JWT = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const {
    JWT_SECRET = 'secret ;P',
    CREDENTIALS,
    CALENDAR_ID
} = process.env;


let Credentials = JSON.parse(CREDENTIALS);

// Google calendar API settings
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({ version: "v3" });



const auth = new google.auth.JWT(
    Credentials.client_email,
    null,
    Credentials.private_key,
    SCOPES
);

// Your TIMEOFFSET Offset
const TIMEOFFSET = '+05:30';

// Insert new event to Google Calendar
const insertEvent = async (event) => {
    try {
        let response = await calendar.events.insert({
            auth: auth,
            calendarId: CALENDAR_ID,
            resource: event
        });

        if (response['status'] == 200 && response['statusText'] === 'OK') {
            return 1;
        } else {
            return 0;
        }
    } catch (error) {
        console.log(`Error at insertEvent --> ${error}`);
        return 0;
    }
};

router.post('/add_event', verify_token, async (req, res) => {
    try {
        let event = req.body;

        event.start.dateTime = new Date(event.start.dateTime);
        event.end.dateTime = new Date(event.end.dateTime);

        let flag = await insertEvent(event);

        if (flag == 0) {
            console.log("Error creating event");
            res.status(400).json({ message: "Error creating event" });
        } else {
            console.log("Successfully created event");
            res.status(200).json({ message: "Successfully created event" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router