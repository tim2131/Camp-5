// /models/stock
const connection = require("../utils/db");

// 取得全部資料

async function getAllFav() {
  let [data] = await connection.execute(
    "SELECT * FROM camp_fav LEFT JOIN camp ON camp_id= Cid WHERE user_id=? ORDER BY camp.camp_name ASC",
    [1]
  );

  console.log(data);
  // console.log(data[0].id)
  return data;
}

module.exports = {
  getAllFav,
};
