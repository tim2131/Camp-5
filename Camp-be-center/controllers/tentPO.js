const campSQLInfo = require("../models/tentOrder");

let asyncCampOrder = async (req, res, next) => {
  let data = await campSQLInfo.getAllCamp();
  // res.send ==> 純文字
  // res.render ==> server-side render 會去找樣板
  res.json(data);
};


module.exports = {
  asyncCampOrder,
};