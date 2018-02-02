const fs = require("fs");
const file = "./datafiles/m3-customer-data.json";
const readStream = new fs.ReadStream(file);

readStream.on('readable', () => {
    console.log(`Reading a chunk of ${file} ...`);
    let chunk = readStream.read();
    console.log(chunk);
}).on('end', () => {
    console.log("End ");
}).on('error', (err) => {
    if (err.code == 'ENOENT') console.log(`${file} not found`);
    else console.log(err);
}).on('data', (chunk) => {
    console.log(`read ${chunk}`);
    readStream.pause();
    setTimeout(() =>{
        console.log("Veeeenter");
        readStream.resume();
    }, 10000);
});