let fs = require("fs");
let colorPallete = require("./color_ palette.json");

let index = 0;
let colors = [];
for (index = 0; index < 5; index++) {
    let ind = Math.floor(Math.random() * colorPallete.length);
    colors.push(colorPallete[ind]);
}
fs.writeFile("colorGenerated.json", JSON.stringify(colors) + "\n", (err) => {
    if (err) console.log("Can't write to the File");
    else console.log(JSON.stringify(colorPallete[ind]));
});

fs.readFile("colorGenerated.json", "UTF-8", (err, data) => {
    if (err) console.log("Can't read the file");
    else console.log(data);
});
