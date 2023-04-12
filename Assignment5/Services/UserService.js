let fs = require("fs");
let { writeFileSync, readFileSync } = require("../Utils/FileOperartions");
const logger = require("../Utils/logger");

// A) List all buddy's information
function getBuddyService() {
    logger.info("Reached getBuddy Service");
    let errorMsg = "Can't read the file";
    try {
        const buddyList = readFileSync("./cdw_ace23_buddies.json");
        return buddyList;
    } catch (err) {
        logger.error(`${err.status || 500} - ${err.message}`);
        return errorMsg;
    }
}

// B) List a single buddy's information using his employeeId
function getBuddyByIdService(id) {
    logger.info("Reached getBuddyById Service");
    let errorMsg = "Can't read the file";
    let noFileMsg = "Record not found";
    try {
        const buddyList = JSON.parse(readFileSync("./cdw_ace23_buddies.json"));
        const matchedElements = buddyList.filter(
            (element) => element.employeeId == id
        );
        return matchedElements.length > 0 ? matchedElements[0] : noFileMsg;
    } catch (err) {
        logger.error(`${err.status || 500} - ${err.message}`);
        return errorMsg;
    }
}

// C) add new buddy information to the existing list
function addBuddyService(newBuddy) {
    logger.info("Reached addBuddy Service");
    let errorMsg = "Server Error";
    let idMsg = "Record with the same Id already exist";
    let successMsg = "Buddy added";
    let mismatchMsg = "Content Mismatch";
    try {
        const buddy = JSON.parse(
            readFileSync("./cdw_ace23_buddies.json", "utf-8")
        );
        const updateIndex = buddy.findIndex(
            (element) => element.employeeId == newBuddy.employeeId
        );

        const buddyLength = Object.keys(newBuddy).length;
        if (updateIndex == -1) {
            if (buddyLength != 5) {
                return mismatchMsg;
            }
            buddy.push(newBuddy);
            writeFileSync("./cdw_ace23_buddies.json", JSON.stringify(buddy));
            return successMsg;
        } else {
            return idMsg;
        }
    } catch (err) {
        logger.error(`${err.status || 500} - ${err.message}`);
        return errorMsg;
    }
}

// D) update the existing buddy information
function updateBuddyService(data, id) {
    logger.info("Reached updateBuddy Service");
    let errorMsg = "Server Error";
    let successMsg = "Record updated";
    if (data.id != id) {
        return "Id Mismatch";
    }
    try {
        const buddy = JSON.parse(
            readFileSync("./cdw_ace23_buddies.json", "utf-8")
        );

        const updateIndex = buddy.findIndex(
            (element) => element.employeeId == id
        );
        let keys = Object.keys(data);

        keys.forEach((element) => {
            buddy[updateIndex][element] = data[element];
        });

        writeFileSync("./cdw_ace23_buddies.json", JSON.stringify(buddy));
        return successMsg;
    } catch (err) {
        logger.error(`${err.status || 500} - ${err.message}`);
        return errorMsg;
    }
}

// E) Delete the existing buddy
function deleteBuddyService(employeeId) {
    logger.info("Reached deleteBuddy Service");
    let errorMsg = "Server Error";
    try {
        let successMsg = "Buddy deleted";
        let noIdMsg = "No Records Found";
        const buddy = JSON.parse(
            readFileSync("./cdw_ace23_buddies.jso", "utf-8")
        );
        const updateIndex = buddy.findIndex(
            (element) => element.employeeId == employeeId
        );
        if (updateIndex == -1) {
            return noIdMsg;
        }
        buddy.splice(updateIndex, 1);
        writeFileSync("./cdw_ace23_buddies.json", JSON.stringify(buddy));

        return successMsg;
    } catch (err) {
        logger.error(`${err.status || 500} - ${err.message}`);
        return errorMsg;
    }
}

module.exports = {
    getBuddyService, 
    addBuddyService,
    getBuddyByIdService,
    updateBuddyService,
    deleteBuddyService,
};
