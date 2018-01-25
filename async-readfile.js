const fs = require("fs");
let fil1 = "./datafiles/m3-customer-data.json";
let buffer = new Buffer;

// function doLater() {
//     return new Promise((resolve, reject) => {
//         fs.readFile(fil1, (err, buffer) => {
//             console.log(buffer);
//             return buffer;
//         });
//     });
// }
// async function chainStart(){
// 	return await doLater();
// }
// doLater()
//     .then(val => {
//         console.log(JSON.stringify(val, undefined, 2));
//     })
// 	.catch( error => {
// 	   console.log(error);
//     });

//PROMISIFY
const util = require('util');


const read = util.promisify(fs.read);
const open = util.promisify(fs.open);

async function callStat() {
  const stats = await fs.open(fil1, buffer, 1, "utf8", "r", 99, (err, num)=>{
      if (err) return err;
      await read(num,buffer, 0, 1024,(error, content) => {
        if (error) return error;
        return content;
      });
  });
  console.log(`This directory is owned by ${JSON.stringify(stats,undefined,2)}`);
  return stats;
}

callStat().then(v => {
  console.log(v);
});










    // var crypto = require('crypto');
    // var fs = require('fs');
    // var readStream = fs.createReadStream('myfile.txt');
    // var hash = crypto.createHash('sha1');
    // readStream
    //   .on('readable', function () {
    //     var chunk;
    //     while (null !== (chunk = readStream.read())) {
    //       hash.update(chunk);
    //     }
    //   })
    //   .on('end', function () {
    //     console.log(hash.digest('hex'));
    //   });