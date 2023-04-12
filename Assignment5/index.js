let express = require("express");
let fs = require("fs");
let cors = require("cors");
let app = express();
const logger = require("./Utils/logger");
require("dotenv").config();

app.use(cors({ origin: "http://localhost:5000" }));
// For parsing application/json
app.use(express.json());
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

let userRoute = require("./Routes/UserRoute");

app.use("/user", userRoute);

app.use("/", (req, res) => {
    res.send("Base");
});

app.listen(process.env.PORT, () => {
    logger.info(`Server Running on port ${process.env.PORT}`);
    let budddies = []; // add logger
    fs.writeFileSync("cdw_ace23_buddies.json", JSON.stringify(budddies));
});
