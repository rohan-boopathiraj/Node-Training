let {
    writeFileSync,
    readFileSync,
    checkFileExistence,
} = require("../Utils/fileOperation");
let fs = require("fs");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
const logger = require("../Utils/logger");
require("dotenv").config();

let path = "ListifyData/UserData/UserCredentials.json";
async function userLoginService(loginCredentials) {
    try {
        console.log(process.env.ACCESS_TOKEN_SECRET);
        let userDatabase = JSON.parse(readFileSync(path));

        const findUser = userDatabase.find(
            (user) => user.userName === loginCredentials.userName
        );
        if (findUser) {
            console.log("user available");
            if (
                await bcrypt.compare(
                    loginCredentials.password,
                    findUser.password
                )
            ) {
                console.log("password is correct");

                let payloadName = findUser.userName;
                const accessToken = jwt.sign(
                    { payloadName },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "30m" }
                );
                return { token: accessToken, statusMessage: "Logged in" };
            } else {
                console.log("incorrect password");
                return "Incorrect password";
            }
        } else {
            console.log("User not available");
            return "User not available";
        }
    } catch (error) {
        logger.error(`${err.status || 400} - ${err.message}`);
        return "User Login Failed";
    }
}

async function userRegisterService(loginCredentials) {
    try {
        console.log("register");

        let userDatabase = JSON.parse(readFileSync(path));

        const findUser = userDatabase.find(
            (user) => user.userName === loginCredentials.userName
        );

        if (findUser) {
            console.log("User Already Available, login instead");
            return "User Already Available, login instead";
        } else {
            const hashedPwd = await bcrypt.hash(loginCredentials.password, 10);
            const user = {
                userName: loginCredentials.userName,
                password: hashedPwd,
            };

            userDatabase.push(user);
            writeFileSync(path, JSON.stringify(userDatabase));

            let payloadName = user.userName;
            const accessToken = jwt.sign(
                { payloadName },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "30m" }
            );
            return { token: accessToken, statusMessage: "Logged in" };
        }
    } catch (error) {
        logger.error(`${err.status || 400} - ${err.message}`);
        return "User Register Failed";
    }
}

module.exports = { userLoginService, userRegisterService };

// let data = require("../AllData/UserData/UserCredentials.json");

// async function userLoginService(loginCredentials) {
//     let userDatabase = JSON.parse(
//         readFileSync("AllData/UserData/UserCredentials.json")
//     );

//     const findUser = userDatabase.find(
//         (user) => user.userName === loginCredentials.userName
//     );

//     if (findUser) {
//         if (
//             await bcrypt.compare(loginCredentials.password, findUser.password)
//         ) {
//             // Once the login is success, sent the token to all perform operations
//             console.log("login");

//             // jwt authorization (Move this code to the model layer)
//             const accessToken = jwt.sign(findUser, "cskpudipudi");
//             console.log(accessToken);

//             return "Login success";
//         } else {
//             return "Incorrect Password";
//         }
//     } else {
//         // Once the new register have register, sent the token to perform operations
//         console.log("register");
//         const hashedPwd = await bcrypt.hash(loginCredentials.password, 10);
//         const user = {
//             userName: loginCredentials.userName,
//             password: hashedPwd,
//         };
//         userDatabase.push(user);
//         writeFileSync(
//             "AllData/UserData/UserCredentials.json",
//             JSON.stringify(userDatabase)
//         );

//         return "New User registered";
//     }
// }
