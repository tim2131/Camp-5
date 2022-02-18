const orderDetailSQLInfo = require("../models/campOrderDetail.js");
//會員
let asyncCampOrderppl = async (req, res, next) => {
  let data = await orderDetailSQLInfo.getCampPOppl();
  // res.send ==> 純文字
  // res.render ==> server-side render 會去找樣板
  res.json(data);
};
// 取得訂單營地資料
let asyncCampOrderCamp = async (req, res, next) => {
  let data = await orderDetailSQLInfo.getCampPOCamp();
  // res.send ==> 純文字
  // res.render ==> server-side render 會去找樣板
  res.json(data);
};
// 取得訂單帳篷資料
let asyncCampOrderTent = async (req, res, next) => {
  let data = await orderDetailSQLInfo.getCampPOTent();
  // res.send ==> 純文字
  // res.render ==> server-side render 會去找樣板
  res.json(data);
};
// 取得訂單加購
let asyncCampOrderAct = async (req, res, next) => {
  let data = await orderDetailSQLInfo.getCampPOAct();
  // res.send ==> 純文字
  // res.render ==> server-side render 會去找樣板
  res.json(data);
};


module.exports = {
  asyncCampOrderppl,
  asyncCampOrderCamp,
  asyncCampOrderTent,
  asyncCampOrderAct,
};