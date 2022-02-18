// /models/stock
const connection = require("../utils/db");

// 取得全部資料
async function getAllCamp() {
  let [data, fields] = await connection.execute(
    "SELECT * FROM camp_order LEFT JOIN camp ON camp_order.camp_id=camp.id WHERE user_id=?",
    [1]

  );
  
  console.log(data);
  console.log(data[0].id)
  return data;
}



module.exports = {
  getAllCamp,
};