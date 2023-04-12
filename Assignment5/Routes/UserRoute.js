let express = require("express");
let router = express.Router(); 

let userController = require("../Controllers/UserController");

router.post("/", userController.addBuddy);

router.get("/", userController.getBuddy);  

router.get("/:id", userController.getBuddyById);

router.put("/:id", userController.updateBuddy);

router.delete("/:id", userController.deleteBuddy);

module.exports = router;
