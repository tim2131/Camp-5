const favSQLInfo = require("../models/fav.js");

let asyncAllFav = async (req, res, next) => {
  console.log("sesson",req.session)
  let memberID=1 //req.session.member.id
  let data = await favSQLInfo.getAllFav(memberID);
  res.json(data);
};

module.exports = {
  asyncAllFav,
};
