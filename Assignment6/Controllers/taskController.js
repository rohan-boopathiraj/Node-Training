const {
    createTaskService,
    readTaskService,
    readTaskByIdService,
    updateTaskService,
    deleteTaskService,
    sortTask,
    filterTask,
} = require("../Services/taskService");

let createTask = (req, res) => {
    let newTaskData = req.body;
    let currentUser = req.user;
    res.send(createTaskService(newTaskData, currentUser));
    // send this service to get this specific user related tasks
    console.log("in controller -- current user", currentUser);
};

let readTask = (req, res) => {
    let currentUser = req.user;
    console.log(currentUser, "current user");
    let sortBy = req.query.sort;
    let filterBy = req.query.filter;
    let filterValue = req.query.value;
    // let PAGE_SIZE = req.query.pageSize;
    // let pageNumber = req.query;
    if (sortBy) {
        console.log(sortBy);
        res.send(sortTask(currentUser, sortBy));
    } else if (filterBy && filterValue) {
        res.send(filterTask(currentUser, filterBy, filterValue));
    } else {
        res.send(readTaskService(currentUser));
    }
};

let readTaskById = (req, res) => {
    let currentUser = req.user;
    let id = req.params.id;
    console.log(currentUser, id, "user and id");
    res.send(readTaskByIdService(currentUser, id));
};

let updateTask = (req, res) => {
    let currentUser = req.user;
    let id = req.params.id;
    let updateTaskData = req.body;
    res.send(updateTaskService(currentUser, id, updateTaskData));
};

let deleteTask = (req, res) => {
    let currentUser = req.user;
    let id = req.params.id;
    res.send(deleteTaskService(currentUser, id));
};

module.exports = { createTask, readTask, readTaskById, updateTask, deleteTask };
