// /controllers/stock
const connection = require("../utils/db");

//User基本資料:名字,點數,照片,跟等級=消費金額
let asyncUserData = async (req, res,
   next) => {
  let memberId = req.session.member.id;
  console.log("sesson",req.session.member.id)
  let data = await connection.execute(
    "SELECT user.id,user.name,user.acc_total,user.point, user_pic.id AS picId,user_pic.user_id,user_pic.img FROM user LEFT JOIN user_pic ON user.id=user_pic.user_id WHERE user.id=? ORDER BY user_pic.id DESC",
    [memberId]
  );
  console.log(data[0][0]);
  return res.json(data);;
};
//User coupon 前三筆
let couponData = async (req, res, next) => {
  let memberId = req.session.member.id;
  console.log("sesson", req.session.member.id);
  let data = await connection.execute(
    "select * FROM coupon WHERE pastdue_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 14 DAY) AND user_id=? AND status=1 ORDER BY `pastdue_date` ASC LIMIT 3;",
    [memberId]
  );
  console.log(data[0][0]);
  return res.json(data);
};
//User coupon all
let couponAllData = async (req, res, next) => {
  let memberId = req.session.member.id;
  console.log("sesson", req.session.member.id);
  let data = await connection.execute(
    "select * FROM coupon WHERE pastdue_date > CURDATE() AND user_id=? AND status=1 ORDER BY `pastdue_date` ASC;",
    [memberId]
  );
  console.log(data[0][0]);
  return res.json(data);
};
//User itinerary
let itineraryData = async (req, res, next) => {
  let memberId = req.session.member.id;
  console.log("sesson", req.session.member.id);
  let data = await connection.execute("select camp_order.id AS CAMPID,camp_order.user_id,camp_order.camp_id,camp_order.orderstatus_id,camp_order.orderdate_start,camp.Cid,camp.camp_name,camp.camp_add FROM camp_order LEFT JOIN camp ON camp_order.camp_id=camp.Cid WHERE camp_order.orderdate_start > CURDATE() AND user_id=1 AND camp_order.orderstatus_id=2 ORDER BY camp_order.orderdate_start ASC LIMIT 3;", [
    memberId,
  ]);
  console.log(data[0][0]);
  return res.json(data);
};
//User purchase history
let purchaseData = async (req, res, next) => {
  let memberId = req.session.member.id;
  console.log("sesson", req.session.member.id);
  let data = await connection.execute(
    "SELECT * FROM product_order WHERE user_id=?",
    [memberId]
  );
  console.log(data[0][0]);
  return res.json(data);
};

module.exports = {
  asyncUserData,
  couponData,
  itineraryData,
  purchaseData,
  couponAllData,
};