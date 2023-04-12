let express = require("express");
let router = express.Router();

let userController = require("../Controllers/UserController");

router.post("/create", userController.addBuddy);

router.get("/get", userController.getBuddy);

router.get("/get/:id", userController.getBuddyById);

router.put("/update/:id", userController.updateBuddy);

router.delete("/delete/:id", userController.deleteBuddy);

module.exports = router;
