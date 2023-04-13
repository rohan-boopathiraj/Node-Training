let jwt = require("jsonwebtoken");
require("dotenv").config();

function tokenAuth(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) {
        res.status(403).send("Unauthorized");
    } else {
        try {
            console.log(req.enteredUser, "req entereduser");
            const username = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = username.payloadName;
            console.log(username.payloadName, req.body.userName, "check both");
            console.log(`##### AUTHENTICATED --> ${username} ######`);
            next(); 
        } catch (error) {
            console.log(error);
            res.status(401).send("Unauthorized");
        }
    }
}

module.exports = { tokenAuth };
