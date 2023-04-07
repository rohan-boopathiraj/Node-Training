let fs = require("fs");

function writeFileSync(path, data) {
    fs.writeFileSync(path, data);
}

function readFileSync(path) {
    const data = fs.readFileSync(path, "utf-8");
    return data;
}

module.exports = {
    writeFileSync,
    readFileSync,
};
