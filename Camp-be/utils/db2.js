const mysql = require("mysql2");
// connect MySQL
var connection = mysql.createConnection({
  host: "localhost",
  user: "tt",
  password: "aqui867",
  database: "camp5",
});
module.exports = connection;
