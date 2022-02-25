const mysql = require("mysql2");
// connect MySQL
var connection = mysql.createConnection({
  host: "localhost",
  user: "admin1",
  password: "12345",
  database: "mfee22",
});
module.exports = connection;
