// /models/stock
const connection = require("../utils/db");

// 取得全部資料
async function getAll() {
  let [data, fields] = await connection.execute("SELECT * FROM user");
  console.log(data);
  return data;
}

// 取得顧客資訊
async function userInfoByID(userId) {
  let [userInfo] = await connection.execute(
    "SELECT * AS total FROM user WHERE id=?",
    [userId]
  );
  return userInfo;
}

module.exports = {
  getAll,
  userInfoByID,

};