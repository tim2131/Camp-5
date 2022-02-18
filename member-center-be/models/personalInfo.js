// /models/stock
const connection = require("../utils/db");

// // 取得全部資料
// async function getAll() {
//   let [data, fields] = await connection.execute("SELECT * FROM user");
//   console.log(data);
//   console.log(data[0].id)
//   return data;
// }


// 取得顧客資訊
async function getUserData(userId) {
//1要從session得到userID
  let [userData] = await connection.execute( "SELECT * FROM user WHERE id=?",[1]);
  console.log(userData);
  return userData;
  
}

module.exports = {
  getUserData,
};