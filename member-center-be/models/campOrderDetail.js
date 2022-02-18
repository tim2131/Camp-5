// /models/stock
const connection = require("../utils/db");

// 取得訂單會員資料
async function getCampPOppl() {
  let [data, fields] = await connection.execute(
    "SELECT * FROM camp_order LEFT JOIN user ON camp_order.user_id=user.id WHERE camp_order.user_id=? AND camp_order.id=?",
    [1, 1]
  );
  console.log(data);
  console.log(data[0].id);
  return data;
}
// 取得訂單營地資料
async function getCampPOCamp() {
  let [data, fields] = await connection.execute(
    "SELECT * FROM camp_order LEFT JOIN camp ON camp_order.camp_id=camp.id WHERE user_id=? AND camp_order.id=?",
    [1, 1]
  );
  console.log(data);
  console.log(data[0].id);
  return data;
}
// 取得訂單帳篷資料 還沒有join tent
async function getCampPOTent() {
  let [data, fields] = await connection.execute(
    "SELECT * FROM camp_orderdet LEFT JOIN camp_order ON camp_orderdet.camporder_id=camp_order.id WHERE camporder_id=?",
    [1]
  );
  console.log(data);
  console.log(data[0].id);
  return data;
}
// 取得訂單加購資料 
async function getCampPOAct() {
  let [data, fields] = await connection.execute(
    "SELECT * FROM camp_order LEFT JOIN add_act_order ON camp_order.add_act_id=add_act_order.id WHERE camp_order.id=?",
    [1]
  );
  console.log(data);
  console.log(data[0].id);
  return data;
}

module.exports = {
  getCampPOppl,
  getCampPOCamp,
  getCampPOTent,
  getCampPOAct,
};
