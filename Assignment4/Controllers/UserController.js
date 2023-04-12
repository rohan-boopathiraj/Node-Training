let {
    getBuddyService,
    addBuddyService,
    getBuddyByIdService,
    updateBuddyService, 
    deleteBuddyService,
} = require("../Services/UserService");
let { writeFileSync, readFileSync } = require("../Utils/FileOperartions");
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
    if (isAccessible) {
        const newBuddy = req.body;
        res.send(addBuddyService(newBuddy));
    } else {
        res.send(errorMsg);
    }
};

let getBuddy = (req, res) => {
    if (isAccessible) {
        res.send(getBuddyService());
    } else {
        res.send(errorMsg);
    }
};

let getBuddyById = (req, res) => {
    if (isAccessible) {
        const id = req.params.id;
        res.send(getBuddyByIdService(id));
    } else {
        res.send(errorMsg);
    }
};

let updateBuddy = (req, res) => {
    if (isAccessible) {
        const updatedValue = req.body;
        const id = req.params.id;
        res.send(updateBuddyService(updatedValue, id));
    } else {
        res.send(errorMsg);
    }
};

let deleteBuddy = (req, res) => {
    if (isAccessible) {
        const id = req.params.id;
        res.send(deleteBuddyService(id));
    } else {
        res.send(errorMsg);
    }
};

module.exports = { addBuddy, getBuddy, getBuddyById, updateBuddy, deleteBuddy };
