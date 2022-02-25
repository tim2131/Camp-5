const campSQLInfo = require("../models/tent");

let asyncAddTent = async (req, res, next) => {
  let data = await campSQLInfo.AddTent();
  // res.send ==> 純文字
  // res.render ==> server-side render 會去找樣板
  res.json(data);
};

module.exports = {
  asyncAddTent,
};