const favSQLInfo = require("../models/fav.js");

let asyncAllFav = async (req, res, next) => {
  let data = await favSQLInfo.getAllFav();
  res.json(data);
};

module.exports = {
  asyncAllFav,
};
