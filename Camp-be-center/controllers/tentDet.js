const campSQLInfo = require("../models/tent");

let asyncGetTent = async (req, res, next) => {
  let data = await campSQLInfo.GetTent();
  // res.send ==> 純文字
  // res.render ==> server-side render 會去找樣板
  res.json(data);
};


module.exports = {
    asyncGetTent,
};