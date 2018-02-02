const async = require("async");
const logger = require('morgan');
const errorHandler = require("errorhandler");
const path = require("path");

//const paralell = import parallel from 'async/paralell';
// const paralells = process.argv[2];

var MongoClient = require('mongodb').MongoClient , assert = require('assert');
const filepath = "./datafiles/";
const file1 = "m3-customer-address-data.json";
const file2 = "m3-customer-data.json";

let data = require(String(path.join(__dirname, filepath, file1)));
let appendData = require(String(path.join(__dirname, filepath, file2)));
const bothObj = {file1 : data, file2 : appendData};
data, appendData = undefined; //removing object data to save space

// If you like to Merge data from both customer obects into one single object
// function mergeData(object1, object2) {
//   // ASSUMPTION: Both objects have the same order and correlates to eachother.
//   // TODO: Add errorcheck: See if both objects have the same amount of records. 
//   let mergedObject = object1;
//   let counter = 0;
//   object2.forEach(element => {
//     let indexes = Object.keys(element);
//     indexes.forEach(part => {
//       mergedObject[counter][part] = element[part]; 
//       console.log()
//     });
//     counter++;
//   });
//   return mergedObject;
// }
// let appendedData = mergeData(data, appendData);




// Connection URL
const url = 'mongodb://localhost:27017/edx-course-db'
// Use connect method to connect to the DB server


//Insert data to database, takes also care of creating collections

bothObj.forEach((data) => {

  MongoClient.connect(url, (error, db) => {
    assert.equal(null, error);
    console.log("Connected correctly to server");
    console.log('Connection is okay');
    async.parallel(insertDocuments(db, () => {
      db.close()
    }), (error, results) => {
      if (error) console.error(error)
      console.log(results)
    })
  });

  const insertDocuments = (db, callback) => {
    const collection = db.collection('edx-nodejs-assigment3-lab-migration-node-script');
    //remove previous test-dataset
    collection.remove({},function(err, removed){
      if (err) {
        console.log("Failed trying to remove old testdata");
        return process.exit(1);
      }
      console.log(`Removed ${removed.result.n} old test documents from the collection`);
    });
  
    // Insert 3 documents
    collection.insert(
      data // 3 documents
    , (error, result) => {
      if (error) return process.exit(1)
      // console.log(result.result.n) // will be 3
      // console.log(result.ops.length) // will be 3
      console.log(`Created collection and added ${result.result.n} documents to edx-nodejs-assigment3-lab-migration-node-script database`);
      callback(result)
    })
  }

}); // forEach END

