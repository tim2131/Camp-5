// /models/stock
const connection = require("../utils/db");

// 取得全部資料
async function getAllCamp() {
  let [data, fields] = await connection.execute(
    "SELECT * FROM camp_order WHERE user_id=? AND orderstatus_id=?",
    [1,1]

  );
  console.log(data);
  console.log(data[0].id)
  return data;
}



module.exports = {
  getAllCamp,
};