let {
    getBuddyService,
    addBuddyService,
    getBuddyByIdService,
    updateBuddyService,
    deleteBuddyService,
} = require("../Services/UserService");
let { writeFileSync, readFileSync } = require("../Utils/FileOperartions");
let fs = require("fs");
const logger = require("../Utils/logger");

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
    logger.info("Reached addBuddy Controller");
    if (isAccessible) {
        const newBuddy = req.body;
        logger.info("Control passed to addBuddy Service ");
        res.send(addBuddyService(newBuddy));
    } else {
        logger.info("Error in addBuddy Controller");
        res.send(errorMsg);
    }
};

let getBuddy = (req, res) => {
    logger.info("Reached getBuddy Controller");
    if (isAccessible) {
        logger.info("Control passed to getBuddy Service ");
        res.send(getBuddyService());
    } else {
        logger.info("Error in getBuddy Controller");
        res.send(errorMsg);
    }
};

let getBuddyById = (req, res) => {
    logger.info("Reached getBuddyById Controller");
    if (isAccessible) {
        const id = req.params.id;
        logger.info("Control passed to getBuddyById Service ");
        res.send(getBuddyByIdService(id));
    } else {
        logger.info("Error in getBuddyById Controller");
        res.send(errorMsg);
    }
};

let updateBuddy = (req, res) => {
    logger.info("Reached updateBuddy Controller");
    if (isAccessible) {
        const updatedValue = req.body;
        const id = req.params.id;
        logger.info("Control passed to updateBuddy Service ");
        res.send(updateBuddyService(updatedValue, id));
    } else {
        logger.info("Error in updateBuddy Controller");
        res.send(errorMsg);
    } 
};

let deleteBuddy = (req, res) => {
    logger.info("Reached deleteBuddy Controller");
    if (isAccessible) {
        const id = req.params.id;
        logger.info("Control passed to deleteBuddy Service ");
        res.send(deleteBuddyService(id));
    } else {
        logger.info("Error in deleteBuddy Controller");
        res.send(errorMsg);
    }
};

module.exports = { addBuddy, getBuddy, getBuddyById, updateBuddy, deleteBuddy };
