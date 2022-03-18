const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let dbName = "assign-mentor";
let dbUrl = process.env.MONGO_URL;

module.exports = { dbUrl, mongodb, MongoClient };
