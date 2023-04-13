function errorMsgHandler(msg, statusCode) {
    return { statusCode: statusCode, Message: msg };
}

module.exports = { errorMsgHandler }; 
   