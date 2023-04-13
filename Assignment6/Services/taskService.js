let lodash = require("lodash");
const {
    writeFileSync,
    readFileSync,
    checkFileExistence,
} = require("../Utils/fileOperation");
const path = "ListifyData/TaskData/usersTaskData.json";

function createTaskService(newTaskData, currentUser) {
    checkFileExistence(path); // checks if file exists, if not creates new file

    const now = new Date();
    const timestamp = now.toISOString();
    newTaskData.CreatedAt = timestamp.slice(0, 19);

    let allUsersTaskData = JSON.parse(readFileSync(path));
    // console.log(allUsersTaskData, "all user data");

    if (currentUser in allUsersTaskData) {
        console.log("User task already exist");
        // console.log(allUsersTaskData[currentUser]);

        let maxId = 0;
        for (let i = 0; i < allUsersTaskData[currentUser].length; i++) {
            if (allUsersTaskData[currentUser][i].Id > maxId) {
                maxId = allUsersTaskData[currentUser][i].Id;
                // console.log(maxId, "Inside loop");
            }
        }
        console.log(maxId, "max id");

        newTaskData.Id = maxId + 1;
        console.log(newTaskData, "current task");

        allUsersTaskData[currentUser].push(newTaskData);
        writeFileSync(path, JSON.stringify(allUsersTaskData));
        // console.log(allUsersTaskData[currentUser], "task appended");
        console.log(`New Task for ${currentUser} was added to the file`);
    } else {
        allUsersTaskData[currentUser] = [newTaskData];
        // writeFileSync(path, JSON.stringify({ [currentUser]: [newTaskData] }));
        newTaskData.Id = 1;
        writeFileSync(path, JSON.stringify(allUsersTaskData));
        console.log(
            `New key for ${currentUser} was created and stored in file`
        );
    }
}

function readTaskService(currentUser) {
    let allUsersTaskData = JSON.parse(readFileSync(path));
    let task = allUsersTaskData[currentUser];
    if (task) {
        return task;
    } else {
        return "No Tasks to Display";
    }
}

function readTaskByIdService(currentUser, id) {
    console.log(currentUser, id);
    let allUsersTaskData = JSON.parse(readFileSync(path));
    let currentUserTaskData = allUsersTaskData[currentUser]; // array of task

    let requiredTask = currentUserTaskData.find((task) => task.Id == id);
    // let requiredTask = currentUserTaskData.find((task) => {
    //     if (task.Id == id) {
    //         return task;
    //     }
    // });
    if (requiredTask) {
        return requiredTask;
    } else {
        return "Task Not Found";
    }
}

function updateTaskService(currentUser, id, updateTaskData) {
    let allUsersTaskData = JSON.parse(readFileSync(path));
    let requiredTask = readTaskByIdService(currentUser, id); // contains updated task contents
    if (requiredTask == "Task Not Found") {
        return "Task Not Found";
    }
    let allCurrentUserTask = readTaskService(currentUser); // if I del 2 and update 1, it creates 1 ... wtf!
    let keys = Object.keys(updateTaskData);
    console.log(keys);

    keys.forEach((key) => (requiredTask[key] = updateTaskData[key]));

    console.log(allCurrentUserTask, "all cuurent user dta");
    let taskIndex = requiredTask.Id - 1;
    if (taskIndex != isNaN) {
        allCurrentUserTask.splice(taskIndex, 1);
        allCurrentUserTask.push(requiredTask);
        allUsersTaskData[currentUser] = allCurrentUserTask;
        writeFileSync(path, JSON.stringify(allUsersTaskData));
    } else {
        return "Task Not Found";
    }
    // console.log(taskIndex);
    // console.log(requiredTask);
    // writeFileSync(path, JSON.stringify(requiredTask));
}

function deleteTaskService(currentUser, id) {
    let allUsersTaskData = JSON.parse(readFileSync(path));
    let requiredTask = readTaskService(currentUser);
    console.log(requiredTask, "req task for del");

    let taskIndex = requiredTask.findIndex((task) => task.Id == id);
    console.log(taskIndex, "taskindex");

    if (taskIndex == -1) {
        return "Task Not Found";
    } else {
        requiredTask.splice(taskIndex, 1);
        allUsersTaskData[currentUser] = requiredTask;
        writeFileSync(path, JSON.stringify(allUsersTaskData));
    }
}

function sortTask(currentUser, sortBy) {
    let allCurrentUserTask = readTaskService(currentUser);
    let sortedData;
    if (sortBy == "dueDate") {
        sortedData = lodash.sortBy(
            allCurrentUserTask,
            (obj) => new Date(obj[sortBy])
        );
    } else {
        sortedData = lodash.sortBy(allCurrentUserTask, sortBy);
    }

    return sortedData;

    const PAGE_SIZE = 1; // number of items per page
    const pageNumber = 2; // current page number (starting from 1)

    // Calculate the start and end index of the current page
    const startIndex = (pageNumber - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    // Get the current page of data
    const currentPageData = sortedData.slice(startIndex, endIndex);

    if (currentPageData.length == 0) {
        return "No Data At This Page ";
    } else {
        return currentPageData;
    }
}

function filterTask(currentUser, filterBy, filterValue) {
    let allCurrentUserTask = readTaskService(currentUser);

    const filterFn = (obj) => obj[filterBy] == filterValue;
    let filteredData;
    if (filterBy == "dueDate") {
        filteredData = allCurrentUserTask.filter(
            (item) => item.dueDate === filterValue
        );
    } else {
        filteredData = lodash.filter(allCurrentUserTask, filterFn);
    }
    if (filteredData.length == 0) {
        return "Invalid filter or value";
    } else {
        return filteredData;
    }
}
module.exports = {
    createTaskService,
    readTaskService,
    readTaskByIdService,
    updateTaskService,
    deleteTaskService,
    sortTask,
    filterTask,
};

// keys = [];
// function createTaskService(newTaskData, currentUser) {
//     const path = "AllData/TaskData/TestUsersTaskData.json";
//     let allTaskData = JSON.parse(readFileSync(path));

//     // extract username from the token here

//     // // As of now assume username as rohan
//     // rohan --> which is the username should come for token and it acts like primary key
//     const userName = "ajay";
//     // const task = { [userName]: [newTaskData] };
//     // console.log(task);
//     // console.log(task, Array(newTaskData), "task");

//     if (JSON.stringify(allTaskData) == "[]") {
//         const task = { [userName]: [newTaskData] };
//         allTaskData.push(task);
//         console.log(userName, "userName");
//         keys.push(userName);
//         writeFileSync(path, JSON.stringify(allTaskData));
//         console.log("writing for first time");
//     } else {
//         console.log(keys, "keys");
//         const findUser = keys.find((key) => key == userName);

//         console.log(findUser, "findUser");
//         if (findUser) {
//             console.log("user already exists");
//         } else {
//             const task = { [userName]: [newTaskData] };
//             allTaskData.push(task);
//             keys.push(userName);
//             writeFileSync(path, JSON.stringify(allTaskData));
//             console.log("file not empty and the entry is new ");
//         }
//     }

//     return "Task created";
// }

// module.exports = { createTaskService };

// function readTaskService() {
//     // extract username here and based on the username display tasks
//     // From jwt token take the username

//     // As of now assume username as rohan
//     const userName = "rohan";

//     const allTaskData = JSON.parse(readFileSync(path));

//     const findUser = allTaskData.find(
//         (user) => user.userName === loginCredentials.userName
//     );
// }
