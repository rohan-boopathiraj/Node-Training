let express = require("express");
let fs = require("fs");
let app = express();
let port = 5000;

// For parsing application/json
app.use(express.json());
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

let userRoute = require("./Routes/UserRoute");

app.use("/user", userRoute);

app.use("/", (req, res) => {
    res.send("Base");
});

app.listen(port, () => {
    let budddies = [];
    fs.writeFileSync("cdw_ace23_buddies.json", JSON.stringify(budddies));
});
