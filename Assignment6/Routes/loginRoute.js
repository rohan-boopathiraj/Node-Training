let express = require("express");
let router = express.Router();
const { userLogin, userRegister } = require("../Controllers/loginController");

router.post("/login", userLogin);
router.post("/register", userRegister);

module.exports = router;
