// /models/stock
const connection = require("../utils/db");

// 取得全部資料
async function getAll() {
  let [data, fields] = await connection.execute("SELECT * FROM camp");
  console.log(data);
  return data;
}

// // 取得某個代碼的總筆數
// async function countByCode(campId) {
//   let [total] = await connection.execute(
//     "SELECT COUNT(*) AS total FROM camp WHERE id=?",
//     [campId]
//   );
//   return total[0].total;
// }

module.exports = {
  getAll,
//   countByCode,
};
