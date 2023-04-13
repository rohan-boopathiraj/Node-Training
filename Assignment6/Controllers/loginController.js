const {
    userLoginService,
    userRegisterService,
} = require("../Services/loginService");

let userLogin = (req, res) => {
    const loginCredentials = req.body;
    req.enteredUser = req.body.userName;
    console.log(req.enteredUser, "entered user");

    const msg = userLoginService(loginCredentials);
    // res.send(msg);
    msg.then((result) => {
        res.status(200).send({ message: result });
    });
};

let userRegister = (req, res) => {
    const registerCredentials = req.body;
    req.enteredUser = req.body.userName;
    const msg = userRegisterService(registerCredentials);
    // res.send(msg);
    msg.then((result) => {
        res.status(201).send(result);
    });
};

module.exports = { userLogin, userRegister };
