// /controllers/stock
const campModel = require("../models/campDetail");

let getAll = async (req, res, next) => {
  let data = await campModel.getAll();
  // res.send ==> 純文字
  // res.render ==> server-side render 會去找樣板
  res.json(data);
};

// let countByCode = async (req, res, next) => {
//   let total = await campModel.countByCode(req.params.campId);

//   res.json(total);
// };
module.exports = {
  getAll,
//   countByCode,
};
