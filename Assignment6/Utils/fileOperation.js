let fs = require("fs");

function writeFileSync(path, data) {
    fs.writeFileSync(path, data);
}

function readFileSync(path) {
    const data = fs.readFileSync(path, "utf-8");
    return data;
}

function checkFileExistence(path) {
    fs.access(path, fs.constants.F_OK, (err) => {
        if (err) {
            // File does not exist, create new file
            fs.writeFile(path, "{}", (err) => {
                if (err) throw err;
                console.log(`New file created at ${path}`);
            });
        } else {
            // File exists
            console.log(`File exists at ${path}`);
        }
    });
}

module.exports = {
    writeFileSync,
    readFileSync,
    checkFileExistence,
};

// {
//     "title": "bathing",
//     "description": "bath before 6pm",
//     "priority": 1,
//     "dueDate": "08/04/2023",
//     "comments": [
//         "Urgent",
//         "important"
//     ]}


// {
//     "userName": "rohan",
//     "password": "rohan"
//   }


// {
//     "rohan": [
//         {
//             "title": "bathing",
//             "description": "bath before 6pm",
//             "priority": 1,
//             "dueDate": "08/04/2023",
//             "comments": [
//                 "Urgent",
//                 "important"
//             ],
//             "CreatedAt": "2023-04-10T19:45:08",
//             "Id": 1
//         },
//         {
//             "title": "lifting",
//             "description": "lift before 6pm",
//             "priority": 1,
//             "dueDate": "08/04/2023",
//             "comments": [
//                 "Urgent",
//                 "important"
//             ],
//             "CreatedAt": "2023-04-10T19:45:19",
//             "Id": 2
//         }
//     ],
//     "kabal": [
        // {
        //     "title": "bathing",
        //     "description": "bath before 6pm",
        //     "priority": 1,
        //     "dueDate": "08/04/2023",
        //     "comments": [
        //         "Urgent",
        //         "important"
        //     ],
        //     "CreatedAt": "2023-04-10T19:47:08",
        //     "Id": 1
        // },
        // {
        //     "title": "liftng",
        //     "description": "lfiting before 6pm",
        //     "priority": 1,
        //     "dueDate": "08/04/2023",
        //     "comments": [
        //         "Urgent",
        //         "important"
        //     ],
        //     "CreatedAt": "2023-04-10T19:47:17",
        //     "Id": 2
        // }
//     ]
// }