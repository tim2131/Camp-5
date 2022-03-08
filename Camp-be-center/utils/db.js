// const mysql = require("mysql2");
// require("dotenv").config();

// // 把 createConnection -> createPool
// let pool = mysql.createPool({
//   // host: process.env.DB_HOST,
//   // port: process.env.DB_PORT,
//   // user: process.env.DB_USER,
//   // password: process.env.DB_PASSWORD,
//   // database: process.env.DB_NAME,
//   // 加上連線數限制
//   connectionLimit: 10,
//   dateStrings: true,
// });

// // 傳回 pool.promise()
// module.exports = pool.promise();
const mysql = require("mysql2");
// connect MySQL
var connection = mysql.createConnection({
    host: "localhost",
    user: "mfee22_camp",
    password: "mfee22_camp",
    database: "mfee22",
});
module.exports = connection;