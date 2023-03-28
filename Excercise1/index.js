let fs = require('fs')
let colorPallete = require('./color_ palette.json')

let index = 0
for(index = 0; index < 5; index++){
    let ind = Math.floor(Math.random() * colorPallete.length);

    fs.appendFile("colorGenerated.txt", JSON.stringify(colorPallete[ind]) + "\n",(err)=>{
        if(err)
            console.log("Can't write to the File");
        else
            console.log(JSON.stringify(colorPallete[ind]));
    })
}

    fs.readFile("colorGenerated.txt", "UTF-8", (err, data)=>{
        if(err)
            console.log("Can't read the file");
        else    
            console.log(data);
    })
 