// N = argumented number
// Streamread N documents from file
// insert collection.count / N * 10
// 1000 / 1000 * 10 = 10 simultaniously requests
// 1000 / 500 * 10 = 20 simultaniously requests
const async = require("async");
const logger = require('morgan');
const errorHandler = require("errorhandler");
const MongoClient = require('mongodb').MongoClient , assert = require('assert');

const N = process.argv[2]; // Presuming run like "node application user-argument"

// Connection URL
const url = 'mongodb://localhost:27017/edx-course-db';

MongoClient.connect(url, (error, db) => {
    if (error) return console.log("Connection error");
    console.log("Connected correctly to server");

    let collectionCount = countDocuments(db, ()=>{
        db.close();
    });
    conosole.log("colcont",collectionCount);


  });

  const countDocuments = (db, callback) => {
    const collection = db.collection('edx-nodejs-assigment3-lab-migration-node-script');
    //remove previous test-dataset
    // Insert 3 documents
    collection.count((error, result) => {
      if (error) return process.exit(1)
      // console.log(result.result.n) // will be 3
      // console.log(result.ops.length) // will be 3
      console.log(`Counted ${result.result.n} documents in edx-nodejs-assigment3-lab-migration-node-script database`);
      callback(result);
    })
  }
  