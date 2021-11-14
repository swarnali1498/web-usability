const JWT = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const {
    JWT_SECRET = 'secret ;P'
} = process.env;

module.exports = function (req, res, next) {
    if (req.headers.authorization !== undefined) {
        const token = req.headers.authorization.split(" ")[1];

        JWT.verify(token, JWT_SECRET, (err, authData) => {
            if (err) {
                res.send({ err }); return;
            }
            console.log(authData);
            req.__id = authData.id;
            next();
        });
    } else {
        res.send(403);
    }
};


