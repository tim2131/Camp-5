// /controllers/stock
const memberInfo = require("../models/personalInfo.js");

let asyncUserData = async (req, res, next) => {
  let data = await memberInfo.getUserData();
  // res.send ==> 純文字
  // res.render ==> server-side render 會去找樣板
  res.json(data);
};


module.exports = {
  asyncUserData,
};