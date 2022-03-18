const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let dbName = "assign-mentor";
let dbUrl =
  "mongodb+srv://john2727:9ZLfpwV9iViIlfCA@cluster0.bobsr.mongodb.net/${dbName}";

module.exports = { dbUrl, mongodb, MongoClient };
