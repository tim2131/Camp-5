// /controllers/stock
const memberInfo = require("../models/personalInfo.js");

let getAll = async (req, res, next) => {
  let data = await memberInfo.getAll();
  // res.send ==> 純文字
  // res.render ==> server-side render 會去找樣板
  res.json(data);
};


module.exports = {
  getAll,
};