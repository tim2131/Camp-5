// /models/stock
const connection = require("../utils/db");

// 取得訂單會員資料
async function getCampPOppl(POId) {
  let [data, fields] = await connection.execute(
    "SELECT * FROM camp_order LEFT JOIN user ON camp_order.user_id=user.id LEFT JOIN coupon on coupon.id=camp_order.coupon WHERE camp_order.user_id=? AND camp_order.id=?",
    [1, POId]
  );
  console.log(data);
  return data;
}
// 取得訂單營地資料
async function getCampPOCamp(POId) {
  let [data, fields] = await connection.execute(
    "SELECT * FROM camp_order LEFT JOIN camp ON camp_order.camp_id=camp.Cid LEFT JOIN camp_cate1 ON camp.campcate1_id=camp_cate1.id LEFT JOIN camp_county ON camp.campcounty_id=camp_county.Yid LEFT JOIN camp_owner ON camp.campowner_id=camp_owner.id LEFT JOIN camp_pic ON camp.Cid=camp_pic.camp_id LEFT JOIN order_status ON camp_order.orderstatus_id=order_status.id WHERE user_id=? AND camp_order.id=?",
    [1, POId]
  );
  console.log(data);
  // console.log(data[0].id);
  return data;
}
// 取得訂單帳篷資料 
async function getCampPOTent(POId) {
  let [data, fields] = await connection.execute(
    "SELECT * FROM camp_orderdet LEFT JOIN camp_order ON camp_orderdet.camporder_id=camp_order.id JOIN tent ON camp_orderdet.tent_id=tent.id LEFT JOIN tent_cate1 on tent.tentcate_id=tent_cate1.id LEFT JOIN order_status ON camp_order.orderstatus_id=order_status.id WHERE camporder_id=?",
    [POId]
  );
  console.log(data);
  // console.log(data[0].id);
  return data;
}
// 取得訂單加購資料 
async function getCampPOAct(POId) {
  let [data, fields] = await connection.execute(
    "SELECT * FROM camp_order LEFT JOIN add_act_order ON camp_order.add_act_id=add_act_order.id LEFT JOIN add_act_orderdet ON add_act_orderdet.activity_order_id=add_act_order.id LEFT JOIN add_act_intro ON add_act_orderdet.activity_id=add_act_intro.id  WHERE camp_order.id=?",
    [POId]
  );
  console.log(data);
  // console.log(data[0].id);
  return data;
}

module.exports = {
  getCampPOppl,
  getCampPOCamp,
  getCampPOTent,
  getCampPOAct,
};
