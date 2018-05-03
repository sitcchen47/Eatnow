const MongoClient = require("mongodb").MongoClient;

const mongoConfig = {
  serverUrl: "mongodb://localhost:27017/",
  database: "Rocket Team -- Eatnow"
};

let _connection = undefined;
let _db = undefined;

module.exports = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(mongoConfig.serverUrl);
    _db = await _connection.db(mongoConfig.database);
  }
  //console.log("connected to mongoDB");
  return _db;
};