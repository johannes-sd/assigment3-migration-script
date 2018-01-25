const fs = require("fs");

let file = "./datafiles/m3-customer-data.json";
let partialData = [];

function getFIleData (file) {
    fs.readFile(file, (err, data)=> {
        if(err) throw error();
        console.log(data);
    })
}

