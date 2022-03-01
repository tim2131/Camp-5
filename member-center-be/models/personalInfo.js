// /models/stock
const connection = require("../utils/db");


// 取得顧客資訊
async function getUserData(userId) {
//1要從session得到userID
  let [userData] = await connection.execute( "SELECT * FROM user WHERE id=?",[req.session.member.id]);
  console.log(userData);
  return userData;
  
}

module.exports = {
  getUserData,
};