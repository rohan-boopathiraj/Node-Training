let fs = require("fs");
let { writeFileSync, readFileSync } = require("../Utils/FileOperartions");

// A) List all buddy's information
function getBuddyService() {
    let errorMsg = "Can't read the file";
    try {
        const buddyList = readFileSync("./cdw_ace23_buddies.json");
        return buddyList;
    } catch (err) {
        return errorMsg;
    }
}

// B) List a single buddy's information using his employeeId
function getBuddyByIdService(id) {
    let errorMsg = "Can't read the file";
    let noFileMsg = "Record not found";
    try {
        const buddyList = JSON.parse(readFileSync("./cdw_ace23_buddies.json"));
        const matchedElements = buddyList.filter(
            (element) => element.employeeId == id
        );
        return matchedElements.length > 0 ? matchedElements[0] : noFileMsg;
    } catch (err) {
        return errorMsg;
    }
}

// C) add new buddy information to the existing list
function addBuddyService(newBuddy) {
    let errorMsg = "Server Error";
    let idMsg = "Record with the same Id already exist";
    try {
        const buddy = JSON.parse(
            readFileSync("./cdw_ace23_buddies.json", "utf-8")
        );
        const updateIndex = buddy.findIndex(
            (element) => element.employeeId == newBuddy.id
        );
        if (updateIndex == -1) {
            buddy.push(newBuddy);
            writeFileSync("./cdw_ace23_buddies.json", JSON.stringify(buddy));
        } else {
            return idMsg;
        }
    } catch (err) {
        return errorMsg;
    }
}

// D) update the existing buddy information
function updateBuddyService(data, id) {
    let errorMsg = "Server Error";
    try {
        let successMsg = "Record updated";
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
        return errorMsg;
    }
}

// E) Delete the existing buddy
function deleteBuddyService(employeeId) {
    let errorMsg = "Server Error";
    try {
        let successMsg = "Buddy deleted";
        let noIdMsg = "No Records Found";
        const buddy = JSON.parse(
            readFileSync("./cdw_ace23_buddies.json", "utf-8")
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
