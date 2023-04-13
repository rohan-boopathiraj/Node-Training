let fs = require("fs");
let fileUtils = require("../Utils/FileOperartions");
let { errorMsgHandler } = require("../Utils/errorHandler");

// A) List all buddy's information
function getBuddyService() {
    let errorMsg = "Can't read the file";
    try {
        const buddyList = fileUtils.readFileSync("./cdw_ace23_buddies.json");
        return buddyList;
    } catch (err) {
        return errorMsgHandler(errorMsg, 404);
    }
}

// B) List a single buddy's information using his employeeId
function getBuddyByIdService(id) {
    let errorMsg = "Can't read the file";
    let noFileMsg = "Record not found";
    try {
        const buddyList = JSON.parse(
            fileUtils.readFileSync("./cdw_ace23_buddies.json")
        );
        const matchedElements = buddyList.filter(
            (element) => element.employeeId == id
        );
        return matchedElements.length > 0
            ? matchedElements[0]
            : errorMsgHandler(noFileMsg, 404);
    } catch (err) {
        return errorMsgHandler(errorMsg, 500);
    }
}

// C) add new buddy information to the existing list
function addBuddyService(newBuddy) {
    let errorMsg = "Server Error";
    let idMsg = "Record with the same Id already exist";
    let successMsg = "Buddy added";
    let mismatchMsg = "Content Mismatch";

    try {
        const buddy = JSON.parse(
            fileUtils.readFileSync("./cdw_ace23_buddies.json", "utf-8")
        );
        const updateIndex = buddy.findIndex(
            (element) => element.employeeId == newBuddy.employeeId
        );

        const buddyLength = Object.keys(newBuddy).length;
        if (updateIndex == -1) {
            if (buddyLength != 5) {
                return errorMsgHandler(mismatchMsg, 400);
            }
            buddy.push(newBuddy);
            fileUtils.writeFileSync(
                "./cdw_ace23_buddies.json",
                JSON.stringify(buddy)
            );
            return errorMsgHandler(successMsg, 200);
        } else {
            return errorMsgHandler(idMsg, 400);
        }
    } catch (err) {
        console.log(err);
        return errorMsgHandler(errorMsg, 500);
    }
}

// D) update the existing buddy information
function updateBuddyService(data, id) {
    let errorMsg = "Server Error";
    let successMsg = "Record updated";
    let mismatchMsg = "Id Mismatch";

    try {
        if (data.employeeId != id) {
            // return "Id Mismatch";
            return errorMsgHandler(mismatchMsg, 400);
        }

        const buddy = JSON.parse(
            fileUtils.readFileSync("./cdw_ace23_buddies.json", "utf-8")
        );

        const updateIndex = buddy.findIndex(
            (element) => element.employeeId == id
        );
        let keys = Object.keys(data);

        keys.forEach((element) => {
            buddy[updateIndex][element] = data[element];
        });

        fileUtils.writeFileSync(
            "./cdw_ace23_buddies.json",
            JSON.stringify(buddy)
        );
        return errorMsgHandler(successMsg, 200);
    } catch (err) {
        console.log(err);
        return errorMsgHandler(errorMsg, 500);
    }
}

// E) Delete the existing buddy
function deleteBuddyService(employeeId) {
    let errorMsg = "Server Error";
    let successMsg = "Buddy deleted";
    let noIdMsg = "No Records Found";
    try {
        const buddy = JSON.parse(
            fileUtils.readFileSync("./cdw_ace23_buddies.json", "utf-8")
        );
        const updateIndex = buddy.findIndex(
            (element) => element.employeeId == employeeId
        );
        if (updateIndex == -1) {
            return errorMsgHandler(noIdMsg, 404);
        }
        buddy.splice(updateIndex, 1);
        fileUtils.writeFileSync(
            "./cdw_ace23_buddies.json",
            JSON.stringify(buddy)
        );

        return errorMsgHandler(successMsg, 200);
    } catch (err) {
        return errorMsgHandler(errorMsg, 500);
    }
}

const userService = {
    getBuddyService,
    addBuddyService,
    getBuddyByIdService,
    updateBuddyService,
    deleteBuddyService,
};
module.exports = userService;
