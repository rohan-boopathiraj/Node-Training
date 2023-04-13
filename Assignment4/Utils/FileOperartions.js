let fs = require("fs");

function writeFileSync(path, data) { 
    fs.writeFileSync(path, data);
}

function readFileSync(path) {
    const data = fs.readFileSync(path, "utf-8");
    return data; 
}

function isAccessible(path) {
    fs.access(path, fs.constants.F_OK, (err) => {
        if (err) {
            return false;
        } else {
            return true;
        }
    });
}

const fileUtils = {
    writeFileSync,
    readFileSync,
    isAccessible,
};
module.exports = fileUtils;
