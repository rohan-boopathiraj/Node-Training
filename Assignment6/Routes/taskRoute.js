let express = require("express");
let taskRouter = express.Router();
let {
    createTask,
    readTask,
    readTaskById,
    updateTask,
    deleteTask, 
} = require("../Controllers/taskController");
 
taskRouter.post("/create", createTask);
taskRouter.get("/read", readTask);
taskRouter.get("/read/:id", readTaskById);
taskRouter.put("/update/:id", updateTask);
taskRouter.delete("/delete/:id", deleteTask);

module.exports = taskRouter;
