const winston = require("winston");
require("dotenv").config();
const options = {
    file: {
        level: process.env.LOGGER_LEVEL,
        filename: "./Utils/logFile.log",
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 5, 
    },
};

const logger = winston.createLogger({
    levels: winston.config.npm.levels,
    transports: [new winston.transports.File(options.file)],
    exitOnError: false,
});

module.exports = logger;
