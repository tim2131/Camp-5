const campSQLInfo = require("../models/campOrder.js");

let asyncCampOrder = async (req, res, next) => {
  let data = await campSQLInfo.getAllCamp();
  res.json(data);
};


module.exports = {
  asyncCampOrder,
};