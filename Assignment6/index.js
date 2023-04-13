let express = require("express");
let fs = require("fs");
require("dotenv").config();
const router = require("./Routes/loginRoute");
const taskRouter = require("./Routes/taskRoute");
const { tokenAuth } = require("./Middleware/tokenAuth");

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Login and Register routers
app.use("/user", router);

// Task routers
app.use("/task", tokenAuth, taskRouter);

app.use("/", (req, res) => {
    res.send("Home router");
});

app.listen(process.env.PORT, () => {
    console.log("server started");
});

module.exports = app;
