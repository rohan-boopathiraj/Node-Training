let {
    getBuddyService,
    addBuddyService,
    getBuddyByIdService,
    updateBuddyService,
    deleteBuddyService,
} = require("../Services/UserService");
let { errorMsgHandler } = require("../Utils/errorHandler");
let fs = require("fs");

let filePath = "./cdw_ace23_buddies.json";
let errorMsg = "File is not Accessible";
let isAccessible = false;
fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
        isAccessible = false;
    } else {
        isAccessible = true;
    }
});

let addBuddy = (req, res) => {
    let emptyFieldMsg = "Fill all the fields";
    let dateFieldMsg = "Enter proper date format";
    let dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (isAccessible) {
        const newBuddy = req.body;
        if (!Object.values(newBuddy).every((value) => value)) {
            res.send(errorMsgHandler(emptyFieldMsg, 400));
        } else if (!dateRegex.test(newBuddy.dob)) {
            res.send(errorMsgHandler(dateFieldMsg, 400));
        } else res.send(addBuddyService(newBuddy));
    } else {
        res.send(errorMsgHandler(errorMsg, 404));
    }
};

let getBuddy = (req, res) => {
    if (isAccessible) {
        res.send(getBuddyService());
    } else {
        res.send(errorMsgHandler(errorMsg, 404));
    }
};

let getBuddyById = (req, res) => {
    if (isAccessible) {
        const id = req.params.id;
        res.send(getBuddyByIdService(id));
    } else {
        res.send(errorMsgHandler(errorMsg, 404));
    }
};

let updateBuddy = (req, res) => {
    if (isAccessible) {
        const updatedValue = req.body;
        const id = req.params.id;
        res.send(updateBuddyService(updatedValue, id));
    } else {
        res.send(errorMsgHandler(errorMsg, 404));
    }
};

let deleteBuddy = (req, res) => { 
    if (isAccessible) {
        const id = req.params.id;
        res.send(deleteBuddyService(id));
    } else {
        res.send(errorMsgHandler(errorMsg, 404));
    }
};

module.exports = { addBuddy, getBuddy, getBuddyById, updateBuddy, deleteBuddy };
