const router = require('express').Router();
const verify_token = require('../middleware/verify_token');
const Page = require('./model/Page');

const JWT = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const {
    JWT_SECRET = 'secret ;P'
} = process.env;


router.get('/', verify_token, async (req, res) => {
    try {
        const page = await Page.findOne({
            URL: req.body.URL
        });
        res.status(200).json(page);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', verify_token, async (req, res) => {
    try {
        console.log("ADDing PAGE");
        console.log(req.body.mouse_coords[0]);
        console.log(typeof (req.body.mouse_coords));
        const page = await Page.findOne({
            URL: req.body.URL
        });
        if (page == null) {
            const new_page = new Page({
                URL: req.body.URL,
                mouse_coords: req.body.mouse_coords
            });
            await new_page.save();
        } else {
            console.log(req.body.mouse_coords)
            page.mouse_coords = page.mouse_coords.concat(req.body.mouse_coords);
            const new_page = await page.save();
        }

        res.status(200).json({ message: "Added mouse coords" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router
